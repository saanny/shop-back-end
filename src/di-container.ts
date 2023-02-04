import { Container } from 'inversify'
import AuthService from './components/Auth/Service';
import UserMongoRepository from './components/users/repositories/UserMongoRepository';

export const container = new Container({
    defaultScope: 'Singleton'
});
container.bind(UserMongoRepository).toSelf();
container.bind(AuthService).toSelf();

