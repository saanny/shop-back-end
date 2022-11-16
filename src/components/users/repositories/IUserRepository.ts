import IRepository from "../../contracts/IRepository";
import IAddress from "../model/IAddress";
import IUser from "../model/IUser";
export default interface IUserRepository extends IRepository<IUser> {
    findByEmail(email: string): Promise<IUser | null>;
    find(params: any): Promise<IUser | null>;

    findAndUpdateOneAddress(
        ID: string,
        user: string,
        params: Partial<IAddress>
    ): Promise<IUser | null>;
    findAddressById(userID: string, addressID: string): Promise<IUser | null>;

    findByIdAndUpdate(userID: string, data: any): Promise<IUser | null>;
}
