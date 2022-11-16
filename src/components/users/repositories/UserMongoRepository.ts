/* eslint-disable no-unused-vars */
import IPagination from "../../contracts/IPagination";
import IAddress from "../model/IAddress";
import IUser from "../model/IUser";
import UserModel from "../model/User";
import IUserRepository from "../repositories/IUserRepository";
export default class UserMongoRepository implements IUserRepository {
    public async findOne(ID: string): Promise<IUser | null> {
        return UserModel.findById(ID).select("+password");
    }
    public async find(params: any): Promise<IUser | null> {
        return UserModel.findOne(params).select("+password");
    }
    public async findByEmail(email: string): Promise<IUser | null> {
        return UserModel.findOne({ email }).select("+password");
    }
    public async findByIdAndUpdate(ID: string, data: any): Promise<IUser | null> {
        return UserModel.findByIdAndUpdate(ID, data, {
            new: true,
            runValidators: true,
        });
    }
    public async findMany(
        params: any,
        relations?: string[],
        pagination?: IPagination,
        sort?: any
    ): Promise<IUser[]> {
        const productQueryParams: any = { ...params };

        const productQuery = UserModel.find(productQueryParams);
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

    public async create(params: any): Promise<IUser> {
        const newUser = new UserModel({ ...params });
        await newUser.save();
        return newUser;
    }

    public async updateOne(
        where: Partial<IUser>,
        updateData: Partial<IUser>
    ): Promise<any> {
        return UserModel.updateOne(where, updateData);
    }
    public async findAndUpdateOneAddress(
        user: string,
        ID: string,
        params: Partial<IAddress>
    ): Promise<IUser | null> {
        return UserModel.findOneAndUpdate(
            {
                _id: user,
                addresses: { $elemMatch: { _id: ID } },
            },
            {
                $set: {
                    "addresses.$.full_name": params.full_name,
                    "addresses.$.title": params.title,
                    "addresses.$.state": params.state,
                    "addresses.$.city": params.city,
                    "addresses.$.address": params.address,
                    "addresses.$.zip_code": params.zip_code,
                    "addresses.$.mobile": params.mobile,
                },
            },
            { new: true, safe: true, upsert: true }
        );
    }
    public async findAddressById(
        userID: string,
        addressID: string
    ): Promise<IUser | null> {
        return UserModel.findOne({ _id: userID }).select({
            address: { $elemMatch: { _id: addressID } },
        });
    }

    public async updateMany(where: any, updateData: any): Promise<any> { }
    public async deleteOne(where: any): Promise<any> { }
    public async deleteMany(where: any): Promise<any> { }
}
