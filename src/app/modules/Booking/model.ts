import { TBooking } from "./booking.interface";
import { bookingSchema } from "./booking.validation";

class Booking implements TBooking {
  date: Date;
  user: string;
  car: string;
  startTime: string;
  endTime: string;
  totalCost: number;

  constructor(data: Omit<TBooking, 'totalCost'> & { pricePerHour: number, userId: string, carId: string }) {
    const { date, userId, carId, startTime, endTime, pricePerHour } = data;

    // Validate data using Zod schema
    const result = bookingSchema.safeParse({ date, user: userId, car: carId, startTime, endTime, totalCost: 0 });

    if (!result.success) {
      throw new Error(`Invalid booking data: ${JSON.stringify(result.error.format())}`);
    }

    this.date = date;
    this.user = userId;
    this.car = carId;
    this.startTime = startTime;
    this.endTime = endTime;
    this.totalCost = this.calculateTotalCost(startTime, endTime, pricePerHour);
  }

  private calculateTotalCost(startTime: string, endTime: string, pricePerHour: number): number {
    const start = this.convertToMinutes(startTime);
    const end = this.convertToMinutes(endTime);
    const duration = (end - start) / 60; // Convert minutes to hours
    return duration * pricePerHour;
  }

  private convertToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }
}

export { Booking };
