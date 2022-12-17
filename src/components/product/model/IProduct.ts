import { Document } from "mongoose";
import ProductStatus from "./ProductStatus";
export default interface IProduct extends Document {
    title: string;
    price: number;
    weight: number;
    description: string;
    thumbnail?: string;
    stock: number;
    category: string;
    created_at: Date;
    updated_at: Date;
    status: ProductStatus;
}
