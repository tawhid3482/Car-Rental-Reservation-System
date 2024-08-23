import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  filter() {
    const { carId, date, ...restQuery } = this.query;
    console.log(carId)

    // Filtering by carId and date if provided
    if (carId) {
      this.modelQuery = this.modelQuery.find({ car: carId });
    }

    if (date) {
      this.modelQuery = this.modelQuery.find({ date });
    }

    this.modelQuery = this.modelQuery.find(restQuery as FilterQuery<T>);

    return this;
  }
}

export default QueryBuilder;
