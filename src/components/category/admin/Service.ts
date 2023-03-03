import { injectable } from 'inversify'
import CategoryMongoRepository from '../repositories/CategoryRepository'
import { GetOneByIdDTO } from '../front/dto/getOneByIdDTO'
import { CreateCategoryDTO } from './dto/createCatgoryDTO'

@injectable()
export class AdminCategoryService {
  constructor(private readonly categoryRepository: CategoryMongoRepository) {}

  public async createOne(body: CreateCategoryDTO) {
    const newCategory = await this.categoryRepository.create(body)

    return newCategory
  }
}
