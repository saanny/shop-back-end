import { Document } from "mongoose";
import IAddress from "./IAddress";
import Roles from "./Roles";
export default interface IUser extends Document {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  addresses: IAddress[];
  password: String;
  role: Roles;
  total_orders: number;
  wallet: number;
  created_at?: Date;
  tokenVersion: number;
  passwordChangedAt: Date;
  passwordResetToken: String;
  passwordResetExpires: Date;
}
