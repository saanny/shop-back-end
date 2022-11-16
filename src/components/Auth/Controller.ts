import { NextFunction, Request, Response } from "express";
import AppError from "../../utils/AppError";
import catchAsync from "../../utils/catchAsync";
import IUserRepository from "../users/repositories/IUserRepository";
import UserRepository from "../users/repositories/UserMongoRepository";

export default class AuthController {
    private readonly userRepository: IUserRepository;

    constructor() {
        this.userRepository = new UserRepository();

    }

    public getMe = (req: Request, res: Response, next: NextFunction) => {
        req.params.id = req.user.id;
        next();
    };

    public register = catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            const newUser = await this.userRepository.create(req.body);

            res.status(201).json({
                status: "success",
                data: {
                    user: newUser,
                },
            });
        }
    );
    public getUser = catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            const result = await this.userRepository.findOne(req.params.id);
            if (!result) {
                return next(new AppError("سندی با این ایدی یافت نشد", 404));
            }
            res.status(200).json({
                status: "success",
                data: {
                    result,
                },
            });
        }
    );

}