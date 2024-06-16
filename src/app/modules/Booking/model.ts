import { TBooking } from "./booking.interface";
import { bookingSchema } from "./booking.validation";

class Booking implements Omit<TBooking, 'totalCost'> {
  date: Date;
  user: string;
  car: string;
  startTime: string;
  endTime: string | null;
  totalCost: number;

  constructor(data: { date: Date; user: string; car: string; startTime: string; endTime: string | null; pricePerHour: number }) {
    const { date, user, car, startTime, endTime, pricePerHour } = data;

    // Validate data using Zod schema
    const result = bookingSchema.safeParse({ date, user, car, startTime, endTime, totalCost: 0 });

    if (!result.success) {
      throw new Error(`Invalid booking data: ${JSON.stringify(result.error.format())}`);
    }

    this.date = date;
    this.user = user;
    this.car = car;
    this.startTime = startTime;
    this.endTime = endTime;
    this.totalCost = this.calculateTotalCost(startTime, endTime, pricePerHour);
  }

  private calculateTotalCost(startTime: string, endTime: string | null, pricePerHour: number): number {
    if (endTime === null) return 0;
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
