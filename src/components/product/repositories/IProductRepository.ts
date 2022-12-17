import IRepository from "../../contracts/IRepository";
import IProduct from "../model/IProduct";
import ProductStatus from "../model/ProductStatus";
export default interface IProductRepository extends IRepository<IProduct> {
    findByStatus(status: ProductStatus): Promise<IProduct[]>;
    getMinMaxPrice(params: any, sort?: any): Promise<any>;
    findManyForUpdate(params: any): Promise<IProduct[]>;
}
