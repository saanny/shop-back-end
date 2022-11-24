import { Document } from "mongoose";
import IAddress from "./IAddress";
export default interface IUser extends Document {
  first_name: string;
  last_name: string;
  email: string;
  addresses: IAddress[];
  password: String;
  created_at?: Date;
  passwordChangedAt: Date;
  passwordResetToken: String;
  passwordResetExpires: Date;
}
