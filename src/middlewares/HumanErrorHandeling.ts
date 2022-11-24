import { Application, NextFunction, Request, Response } from "express";
import { NODE_ENV } from "../conf";
import AppError from "../utils/AppError";
const handleCastErrorDB = (err: any) => {
  const message = `${err.path} : ${err.value} این مقدار وارد شده صحیح نمیباشد `;
  return new AppError(message, 400);
};
const handleDuplicateFieldDB = (err: any) => {
  console.log(err);
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
  const message = ` مقدار  ${value} وارد شده قبلا در دیتابیس ثبت شده است`;

  return new AppError(message, 400);
};
const handleValidationErrorDB = (err: any) => {
  const errors = Object.values(err.errors).map((el: any) => el.message);
  const message = `${errors.join(". ")}`;
  return new AppError(message, 400);
};
const sendErrorForDev = (err: any, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    err: err,
    message: err.message,
    stack: err.stack,
  });
};
const handleJwtError = () =>
  new AppError(
    "توکن ارسالی شما صحیح نمی باشد لطفا دوباره عملیات ورود را انجام دهید",
    401
  );
const handleJwtExpiredError = () =>
  new AppError(
    "توکن شما منقضی شده است! لطفا دوباره عملیات ورود را انجام دهید",
    401
  );
const sendErrorForProduction = (err: any, res: Response) => {
  // Operational, trusted error : send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // programming or other unknow error
  } else {
    // 1) log error
    console.error("ERROR", err);
    // 2) send message
    res.status(500).json({
      status: "error",
      message: "خطا !",
    });
  }
};
export default function HumanErrorHandleing(app: Application) {
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    //console.log(err.stack);

    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if (NODE_ENV === "development") {
      sendErrorForDev(err, res);
    } else if (NODE_ENV === "production") {
      let error = { ...err };
      error.message = err.message;
      if (error.name === "CastError") error = handleCastErrorDB(error);
      if (error.code === 11000) error = handleDuplicateFieldDB(error);
      if (error.name === "ValidationError")
        error = handleValidationErrorDB(error);
      if (error.name === "JsonWebTokenError") error = handleJwtError();
      if (error.name === "TokenExpiredError") error = handleJwtExpiredError();

      sendErrorForProduction(error, res);
    }
  });
}
