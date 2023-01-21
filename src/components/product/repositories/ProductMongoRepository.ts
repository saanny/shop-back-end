/* eslint-disable no-unused-vars */
import ProductModel from "../model/Product";
import IProduct from "../model/IProduct";
import { Types } from "mongoose";
import IPagination from "../../contracts/IPagination";
import ProductStatus from "../model/ProductStatus";
import IProductRepository from "./IProductRepository";

export default class ProductMongoRepository implements IProductRepository {

    public async findOne(
        ID: string,
        relations?: string[]
    ): Promise<IProduct | null> {
        const productQuery = ProductModel.findOne({ _id: ID });
        if (relations && relations.length > 0) {
            relations.forEach((relation: string) => {
                productQuery.populate(relation);
            });
        }
        return productQuery.exec();
    }

    public async findMany(
        params: any,
        relations?: string[],
        pagination?: IPagination,
        sort?: any
    ): Promise<IProduct[]> {
        const productQueryParams: any = { ...params };

        if (params.price) {
            productQueryParams.price = {
                $gte: params.price.min,
                $lte: params.price.max,
            };
        }
        if (params.category) {
            const objectID = Types.ObjectId;
            productQueryParams.category = new objectID(params.category);
        }

        const productQuery = ProductModel.find(productQueryParams);
        if (sort) {
            productQuery.sort(sort);
        }

        if (relations && relations.length > 0) {
            relations.forEach((relation: string) => {
                productQuery.populate(relation);
            });
        }
        if (pagination) {
            productQuery.limit(pagination.perPage).skip(pagination.offset);
        }
        return productQuery.exec();
    }

    public async findManyForUpdate(params: any): Promise<IProduct[]> {
        const productQueryParams: any = { ...params };

        if (params.category) {
            const objectID = Types.ObjectId;
            productQueryParams.category = new objectID(params.category);
        }

        const productQuery = ProductModel.find(productQueryParams);

        return productQuery.exec();
    }

    public async getMinMaxPrice(params: any, sort?: any): Promise<any> {
        const productQueryParams: any = { ...params };
        if (productQueryParams.price) {
            delete productQueryParams["price"];
        }

        const minQuery = ProductModel.find(productQueryParams)
            .sort({ price: 1 })
            .limit(1)
            .then((product) => (product[0] ? product[0].price : 0));
        const maxQuery = ProductModel.find(productQueryParams)
            .sort({ price: -1 })
            .limit(1)
            .then((product) => (product[0] ? product[0].price : 0));

        return Promise.all([minQuery, maxQuery]).then((result) => {
            return {
                min: result[0],
                max: result[1],
            };
        });
    }
    public async findByStatus(status: ProductStatus): Promise<IProduct[]> {
        return ProductModel.find({ status });
    }

    public async create(params: any): Promise<IProduct> {
        const newProduct = new ProductModel({ ...params });
        return newProduct.save();
    }

    public async updateOne(
        where: Partial<IProduct>,
        updateData: Partial<IProduct>
    ): Promise<any> {
        return ProductModel.updateOne(where as any, updateData);
    }

    public async updateMany(where: any, updateData: any): Promise<any> { }
    public async deleteOne(where: any): Promise<any> {
        return ProductModel.findByIdAndDelete(where);
    }
    public async deleteMany(where: any): Promise<any> {
        return ProductModel.deleteMany(where);
    }
}
