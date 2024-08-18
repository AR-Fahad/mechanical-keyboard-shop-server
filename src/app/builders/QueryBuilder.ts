import { FilterQuery, Query } from 'mongoose';

export class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // for minimum & maximum price
  priceRange() {
    if (this?.query?.min) {
      this.modelQuery = this.modelQuery.find({
        price: { $gte: Number(this?.query?.min) },
      });
    }
    if (this?.query?.max) {
      this.modelQuery = this.modelQuery.find({
        price: { $lte: Number(this?.query?.max) },
      });
    }
    return this;
  }

  // for searching
  search(searchableFields: string[]) {
    if (this?.query?.searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => {
          return {
            [field]: { $regex: this?.query?.searchTerm, $options: 'i' },
          } as FilterQuery<T>;
        }),
      });
    }
    return this;
  }

  // for sorting
  sort() {
    const sort = this?.query?.sort
      ? (this.query.sort as string).split(',').join(' ')
      : '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort);
    return this;
  }

  // for paginate
  paginate() {
    const limit = this?.query?.limit ? Number(this.query.limit) : 0; // 0 means get all docs
    const skip = this?.query?.page ? (Number(this.query.page) - 1) * limit : 0;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }
}
