import { Document } from 'mongoose'

export default interface ICategory extends Document {
  title: string
}
