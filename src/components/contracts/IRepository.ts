import IPagination from "./IPagination";

export default interface IRepository<T> {
  findOne(ID: string, relations?: string[]): Promise<T | null>;
  findMany(
    params: any,
    relations?: string[],
    pagination?: IPagination,
    sort?: any
  ): Promise<T[]>;
  create(params: any): Promise<T>;
  updateOne(where: Partial<T>, updateData: Partial<T>): Promise<T | null>;
  updateMany(where: Partial<T>, updateData: Partial<T>): Promise<boolean>;
  deleteOne(ID: string): Promise<boolean>;
  deleteMany(where: any): Promise<boolean>;

}
