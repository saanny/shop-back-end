import { NextFunction, Request, Response } from "express";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { inputValidator } from "../../../utils/InputValidator";
import ProductFrontService from "./Service";
import { inputCreateProduct } from "./ValidationSchema";

@controller('/api/v1/front/products')
export default class ProductController {
    constructor(private readonly productFrontService: ProductFrontService) { }

    @httpGet("/:id")
    public async getOneById(req: Request, res: Response, next: NextFunction) {

        const product = await this.productFrontService.getOneById({
            id: req.params.id,
        });

        return product;

    }

    @httpGet("/")
    public async getAll(req: Request, res: Response, next: NextFunction) {

        const products = await this.productFrontService.getAll();

        return products;

    }

    @httpPost("/", inputValidator(inputCreateProduct))
    public async createOne(req: Request, res: Response, next: NextFunction) {

        const newProduct = await this.productFrontService.createOne(req.body);

        return newProduct;

    }


}