import AppError from "../../utils/AppError";
import UserMongoRepository from "../users/repositories/UserMongoRepository";
import { GetUserDTO } from "./dto/getUserDto";
import { LoginDTO } from "./dto/loginDTO";
import { RegisterUserDTO } from "./dto/registerUserDto";
import { UpdatePasswordDTO } from "./dto/updatePasswordDTO";
import { ForgotPasswordDTO } from './dto/forgotPasswordDTO'
import { ResetPasswordDTO } from "./dto/resetPasswordDTO";
import crypto from 'crypto'
export default class AuthService {

    constructor(private userRepository: UserMongoRepository) { }

    public async getUser(body: GetUserDTO) {
        const result = await this.userRepository.findOne(body.id);

        if (!result) {
            throw new AppError("سندی با این ایدی یافت نشد", 404);
        }

        return result;
    }

    public async register(body: RegisterUserDTO) {
        const newUser = await this.userRepository.create(body);
        return newUser;

    }

    public async login(body: LoginDTO) {

        const { email, password } = body;

        const user: any = await this.userRepository.findByEmail(email);

        if (!user || !(await user.correctPassword(password, user.password))) {
            throw new AppError("ایمیل یا کلمه عبور شما اشتباه میباشد ", 401);
        }

        user.password = undefined;

        return user;

    }

    public async updatePassword(body: UpdatePasswordDTO) {
        const user = await this.userRepository.findOne(body.userId);

        if (
            !(await user?.correctPassword(body.passwordCurrect, user!.password))
        ) {
            throw new AppError("کلمه عبور فعلی شما اشتباه است", 401);
        }

        user!.password = body.password;
        await user?.save();

        return user;
    }

    public async forgotPassword(body: ForgotPasswordDTO) {
        const user: any = await this.userRepository.findByEmail(body.email);

        if (!user) {
            throw new AppError("کاربری با این ایمیل یافت نشد", 404);
        }

        const resetToken = user.createPasswordResetToken();

        await user.save({
            validateBeforeSave: false,
        });

        try {
            const resetURL = `${process.env.APP_FRONT_URL}/auth/reset-password/${resetToken}`;
            console.log(resetURL)
            // await new Email(user,resetURL).sendResetPassword();


        } catch (err) {

            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save({
                validateBeforeSave: false,
            });

            throw new AppError(
                "خطایی در هنگام ارسال ایمیل فراموشی کلمه عبور رخداده است لطفا دوباره امتحان کنید",
                500
            )

        }

    }
    public async resetPassword(body: ResetPasswordDTO) {
        const hashedToken = crypto
            .createHash("sha256")
            .update(body.token)
            .digest("hex");

        const user = await this.userRepository.find({
            passwordResetToken: hashedToken,
            passwordResetExpires: {
                $gt: Date.now(),
            },
        });

        if (!user) {
            throw new AppError("لینک ارسال شده معتبر نمیباشد ", 400);
        }

        user.password = body.password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();
    }



}