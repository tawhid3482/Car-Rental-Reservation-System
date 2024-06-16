export interface TBooking {
    date: Date;
    user: string; // Reference to user model
    car: string; // Reference to car model
    startTime: string; // In 24hr format, e.g., "14:00"
    endTime: string | null; // In 24hr format, e.g., "16:00" or null initially
    totalCost: number; // Total cost of the booking
  }
  