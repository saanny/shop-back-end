import { injectable } from "inversify";
import ProductMongoRepository from "../repositories/ProductMongoRepository";
import { CreateProductDTO } from "./dto/createProductDTO";
import { GetOneByIdDTO } from "./dto/getOneByIdDto";

@injectable()
export default class ProductFrontService {
    constructor(private productRepository: ProductMongoRepository) { }

    public async getOneById(body: GetOneByIdDTO) {
        const product = await this.productRepository.findOne(body.id);

        return product;
    }
    public async getAll() {
        const products = await this.productRepository.findMany({});

        return products;
    }

    public async createOne(body: CreateProductDTO) {
        const newProduct = await this.productRepository.create(body);

        return newProduct;
    }
}