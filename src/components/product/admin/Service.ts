import { injectable } from 'inversify'
import { CreateProductDTO } from '../admin/dto/createProductDTO'
import ProductMongoRepository from '../repositories/ProductMongoRepository'

@injectable()
export class AdminProductService {
  constructor(private productRepository: ProductMongoRepository) {}

  public async createOne(body: CreateProductDTO) {
    const newProduct = await this.productRepository.create(body)

    return newProduct
  }
}
