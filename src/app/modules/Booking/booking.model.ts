// model.ts

import { TBooking } from "./booking.interface";

class Booking implements TBooking {
    date: Date;
    user: string;
    car: string;
    startTime: string;
    endTime: string;
    totalCost: number;

    constructor(date: Date, user: string, car: string, startTime: string, endTime: string, pricePerHour: number) {
        this.date = date;
        this.user = user;
        this.car = car;
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
