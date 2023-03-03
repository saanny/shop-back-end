import { injectable } from 'inversify'
import CategoryMongoRepository from '../repositories/CategoryRepository'
import { GetOneByIdDTO } from '../front/dto/getOneByIdDTO'

@injectable()
export class FrontCategoryService {
  constructor(private readonly categoryRepository: CategoryMongoRepository) {}

  public async getOneById(body: GetOneByIdDTO) {
    const category = await this.categoryRepository.findOne(body.id)

    return category
  }

  public async getAll(limitParam, pageParam) {
    const perPage = limitParam * 1 || 100
    const page = pageParam * 1 || 1
    const offset = (page - 1) * perPage

    const categories = await this.categoryRepository.findMany(
      {},
      [],
      {
        perPage,
        offset,
      },
      {
        created_at: -1,
      }
    )
    const totalItem = await this.categoryRepository.findMany(categories)

    return {
      categories,
      perPage,
      page,
      totalPages: Math.ceil(totalItem.length / perPage),
      totalItems: totalItem.length,
    }
  }
}
