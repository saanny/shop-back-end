import { model, Schema } from "mongoose";
import IProduct from "./IProduct";
import ProductStatus from "./ProductStatus";

const productSchema: Schema = new Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    thumbnail: { type: Schema.Types.ObjectId, ref: "FileManager" },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    status: { type: ProductStatus, default: ProductStatus.INIT },
});
productSchema.index({
    title: "text",
    ratingAverage: -1,
    status: 1,
});



export default model<IProduct>("Product", productSchema);
