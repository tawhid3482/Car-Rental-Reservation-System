// interface.ts

export interface IBooking {
    date: Date;
    user: string; // Reference to user model
    car: string; // Reference to car model
    startTime: string; // In 24hr format, e.g., "14:00"
    endTime: string; // In 24hr format, e.g., "16:00"
    totalCost: number; // Total cost of the booking
}
