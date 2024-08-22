import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

    search(searchableFields: string[]) {
      const carId = this?.query?.carId;
      if (carId) {
        this.modelQuery = this.modelQuery.find({
          $or: searchableFields.map(
            (field) =>
              ({
                [field]: { $regex: carId, $options: 'i' },
              } as FilterQuery<T>)
          ),
        });
      }

      return this;
    }

//   filter() {
//     const queryObj = { ...this.query }; // copy

//     // Filtering
//     const excludeFields = ["carId", "date"];

//     excludeFields.forEach((el) => delete queryObj[el]);

//     this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

//     return this;
//   }
}

export default QueryBuilder;
