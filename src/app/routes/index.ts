import { Router } from "express";
import { UserRoutes } from "../modules/User/user.route";
import { CarRoutes } from "../modules/Car/car.route";
import { BookingRoutes } from "../modules/Booking/booking.route";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { MessageRoutes } from "../modules/Message/message.route";
import { PaymentRoutes } from "../modules/Payment/payment.route";
import { AdminRoutes } from "../modules/Admin/admin.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/auth",
    route: UserRoutes,
  },
  {
    path: "/cars",
    route: CarRoutes,
  },
  {
    path: "/bookings",
    route: BookingRoutes,
  },
  {
    path: "/message",
    route: MessageRoutes,
  },
  {
    path: "/payment",
    route: PaymentRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
