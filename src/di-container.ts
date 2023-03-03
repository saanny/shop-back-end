import AuthService from '@Components/Auth/Service'
import { AdminCategoryService } from '@Components/category/admin/Service'
import { FrontCategoryService } from '@Components/category/front/Service'
import CategoryMongoRepository from '@Components/category/repositories/CategoryRepository'
import { AdminProductService } from '@Components/product/admin/Service'
import ProductMongoRepository from '@Components/product/repositories/ProductMongoRepository'
import { FrontProductService } from '@Components/product/Service'
import UserMongoRepository from '@Components/users/repositories/UserMongoRepository'
import { Container } from 'inversify'

export const container = new Container({
  defaultScope: 'Singleton',
})
container.bind(UserMongoRepository).toSelf()
container.bind(AuthService).toSelf()

container.bind(ProductMongoRepository).toSelf()
container.bind(FrontProductService).toSelf()
container.bind(AdminProductService).toSelf()

container.bind(CategoryMongoRepository).toSelf()
container.bind(AdminCategoryService).toSelf()
container.bind(FrontCategoryService).toSelf()
