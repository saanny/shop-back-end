import { injectable } from 'inversify'
import CategoryMongoRepository from '../repositories/CategoryRepository'

@injectable()
export class CategoryFrontService {
  constructor(private readonly categoryRepository: CategoryMongoRepository) {}
}
