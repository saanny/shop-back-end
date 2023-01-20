import { NextFunction, Request, Response } from "express";
import { createAndSendToken } from "../../services/AuthService";
import AppError from "../../utils/AppError";
import catchAsync from "../../utils/catchAsync";
import IUserRepository from "../users/repositories/IUserRepository";
import UserRepository from "../users/repositories/UserMongoRepository";
import crypto from 'crypto'
export default class AuthController {
    private readonly userRepository: IUserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public getMe = (req: any, res: Response, next: NextFunction) => {
        req.params.id = req.user.id;
        next();
    };

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

    public login = catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            const { email, password } = req.body;

            const user: any = await this.userRepository.findByEmail(email);

            if (!user || !(await user.correctPassword(password, user.password))) {
                return next(new AppError("ایمیل یا کلمه عبور شما اشتباه میباشد ", 401));
            }

            user.password = undefined;
            createAndSendToken(user, 200, res);
        }
    );

    public updatePassword = catchAsync(
        async (req: any, res: Response, next: NextFunction) => {
            const user = await this.userRepository.findOne(req.user.id);

            if (
                !(await user?.correctPassword(req.body.passwordCurrect, user!.password))
            ) {
                return next(new AppError("کلمه عبور فعلی شما اشتباه است", 401));
            }

            user!.password = req.body.password;
            await user?.save();

            createAndSendToken(user, 200, res);
        }
    );

    public forgotPassword = catchAsync(async (req: any, res: Response, next: NextFunction) => {
        const user = await this.userRepository.findByEmail(req.body.email);

        if (!user) {
            return next(new AppError("کاربری با این ایمیل یافت نشد", 404));
        }

        const resetToken = user.createPasswordResetToken();

        await user.save({
            validateBeforeSave: false,
        });

        try {
            const resetURL = `${process.env.APP_FRONT_URL}/auth/reset-password/${resetToken}`;
            // await new Email(user,resetURL).sendResetPassword();

            res.status(200).send({
                success: true,
                message: "ایمیل فراموشی پسورد ارسال شد",
            });
        } catch (err) {
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save({
                validateBeforeSave: false,
            });
            return next(
                new AppError(
                    "خطایی در هنگام ارسال ایمیل فراموشی کلمه عبور رخداده است لطفا دوباره امتحان کنید",
                    500
                )
            );
        }
    });
    public resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const hashedToken = crypto
            .createHash("sha256")
            .update(req.params.token)
            .digest("hex");

        const user = await this.userRepository.find({
            passwordResetToken: hashedToken,
            passwordResetExpires: {
                $gt: Date.now(),
            },
        });

        if (!user) {
            return next(new AppError("لینک ارسال شده معتبر نمیباشد ", 400));
        }

        user.password = req.body.password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        createAndSendToken(user, 200, res);
    });





}