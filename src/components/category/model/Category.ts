import { model, Schema } from 'mongoose'
import CategoryInterface from './ICategory'

const categorySchema: Schema = new Schema({
  title: { type: String, require: true },
})
categorySchema.set('toJSON', {
  virtuals: true,
})
export default model<CategoryInterface>('Category', categorySchema)
