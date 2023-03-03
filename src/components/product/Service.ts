import { injectable } from 'inversify'
import ProductMongoRepository from './repositories/ProductMongoRepository'
import { CreateProductDTO } from './admin/dto/createProductDTO'
import { GetOneByIdDTO } from './front/dto/getOneByIdDTO'

@injectable()
export class FrontProductService {
  constructor(private productRepository: ProductMongoRepository) {}

  public async getOneById(body: GetOneByIdDTO) {
    const product = await this.productRepository.findOne(body.id)

    return product
  }
  public async getAll(limitParam, pageParam) {
    const perPage = limitParam * 1 || 100
    const page = pageParam * 1 || 1
    const offset = (page - 1) * perPage

    const products = await this.productRepository.findMany(
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
    const totalItem = await this.productRepository.findMany(products)

    return {
      products,
      perPage,
      page,
      totalPages: Math.ceil(totalItem.length / perPage),
      totalItems: totalItem.length,
    }
  }

  public async createOne(body: CreateProductDTO) {
    const newProduct = await this.productRepository.create(body)

    return newProduct
  }
}
