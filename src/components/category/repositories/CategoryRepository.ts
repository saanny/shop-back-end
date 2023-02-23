import ICategoryRepository from './ICategoryRepository'
import ICategory from '../model/ICategory'
import CategoryModel from '../model/Category'
import ObjectInterface from '../../contracts/ObjectInterface'
import IPagination from '../../contracts/IPagination'
import { injectable } from 'inversify'

@injectable()
export default class CategoryMongoRepository implements ICategoryRepository {
  public async findOne(ID: string): Promise<ICategory | null> {
    return CategoryModel.findById(ID)
  }
  public async findBySlug(slug: string): Promise<ICategory | null> {
    return CategoryModel.findOne({ slug })
  }
  public async findMany(
    params: ObjectInterface,
    relations?: string[],
    pagination?: IPagination,
    sort?: any
  ): Promise<ICategory[]> {
    const queryData: ObjectInterface = { ...params }
    const categoryQuery = CategoryModel.find(queryData)
    if (relations && relations.length > 0) {
      relations.forEach((relation: string) => {
        categoryQuery.populate(relation)
      })
    }
    if (sort) {
      categoryQuery.sort(sort)
    }
    if (pagination) {
      categoryQuery.limit(pagination.perPage).skip(pagination.offset)
    }
    return categoryQuery.exec()
  }

  public async create(params: any): Promise<ICategory> {
    const newCategory = new CategoryModel({ ...params })
    return newCategory.save()
  }

  public async updateOne(
    where: Partial<ICategory>,
    updateData: Partial<ICategory>
  ): Promise<ICategory | null> {
    return CategoryModel.findByIdAndUpdate(where, updateData, {
      new: true,
      runValidators: false,
    })
  }

  public async updateMany(where: any, updateData: any): Promise<any> {}

  public async deleteMany(where: any): Promise<any> {
    return CategoryModel.deleteMany(where)
  }

  public async deleteOne(where: any): Promise<any> {
    return CategoryModel.findByIdAndDelete(where)
  }
}
