import { Container } from 'inversify'
import AuthService from './components/Auth/Service';
import ProductFrontService from './components/product/front/Service';
import ProductMongoRepository from './components/product/repositories/ProductMongoRepository';
import UserMongoRepository from './components/users/repositories/UserMongoRepository';

export const container = new Container({
    defaultScope: 'Singleton'
});
container.bind(UserMongoRepository).toSelf();
container.bind(AuthService).toSelf();

container.bind(ProductMongoRepository).toSelf();
container.bind(ProductFrontService).toSelf();