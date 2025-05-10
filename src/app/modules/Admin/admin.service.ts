import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Booking } from "../Booking/booking.model";
import UserModel from "../User/user.model";
import { CarModel } from "../Car/car.model";
import { Payment } from "../Payment/payment.model";

const getAdminStatsIntoDB = async (email: string) => {
  const admin = await UserModel.findOne({ email });
  if (!admin || admin.role !== "admin") {
    throw new AppError(httpStatus.BAD_REQUEST, "Admin not Found!");
  }

  // সব বুকিংস সহ কার populate
  const bookings = await Booking.find().populate("car");
  const totalBookings = bookings.length;

  // শুধু ইউজারদের সংখ্যা
  const totalCustomers = await UserModel.countDocuments({ role: "user" });

  // গাড়ির মোট সংখ্যা
  const totalCars = await CarModel.countDocuments();

  // সফল পেমেন্ট থেকে রেভিনিউ ক্যালকুলেট করা
  const successfulPayments = await Payment.find({ status: "success" });
  const totalRevenue = successfulPayments.reduce((acc, payment) => {
    return acc + (payment.amount || 0);
  }, 0).toFixed(2);

  const runningCars = await CarModel.countDocuments({ status: "unavailable" });

  // গত ৩০ দিনের বুকিং
  const last30Days = new Date();
  last30Days.setDate(last30Days.getDate() - 30);
  const recentBookings = await Booking.find({
    createdAt: { $gte: last30Days },
  }).populate("car");

  // Sales Overview (তারিখ অনুযায়ী আয়ের হিসাব)
  const salesOverview = recentBookings.reduce((acc, booking) => {
    const date = (booking.createdAt ?? new Date()).toISOString().slice(0, 10);
    acc[date] = (acc[date] || 0) + (booking.totalCost || 0);
    return acc;
  }, {} as Record<string, number>);

  // কোন গাড়ির বুকিং কতবার হয়েছে
  const carStats = bookings.reduce((acc, booking) => {
    const carId = booking.car?._id?.toString();
    if (carId) {
      acc[carId] = (acc[carId] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  // Top 5 বুক হওয়া গাড়ি
  const sortedTopCars = await Promise.all(
    Object.entries(carStats)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(async ([carId, count]) => {
        const car = await CarModel.findById(carId);
        return {
          car,
          count,
        };
      })
  );

  // নতুন কাস্টমার গত ৭ দিনে
  const last7Days = new Date();
  last7Days.setDate(last7Days.getDate() - 7);
  const newCustomers = await UserModel.find({
    role: "user",
    createdAt: { $gte: last7Days },
  }).select("-password");

  // Activity Timeline
  const activityTimeline = recentBookings.map((booking) => ({
    bookingId: booking._id,
    car: typeof booking.car === 'object' && 'name' in booking.car ? booking.car.name : undefined,
    user: booking.user, // populate করলে আরও ডিটেইল পাওয়া যাবে
    date: booking.createdAt,
  }));

  // সর্বশেষ ১০টি ট্রান্সাকশন
  const recentTransactions = await Payment.find()
    .sort({ createdAt: -1 })
    .limit(10);

  const cars = await CarModel.find();

  return {
    totalRevenue,
    totalBookings,
    totalCustomers,
    totalCars,
    runningCars,
    salesOverview,
    bookingSummary: {
      last30Days: recentBookings.length,
      return: cars.filter((b) => b.status === "available").length,
      running: cars.filter((b) => b.status === "unavailable").length,
    },
    topBookingCars: sortedTopCars,
    newCustomers,
    activityTimeline,
    recentBookings: recentBookings.slice(0, 10),
    transactionsHistory: recentTransactions,
  };
};

export const AdminServices = {
  getAdminStatsIntoDB,
};
