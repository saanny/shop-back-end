import { Application } from "express";
import AppError from "../utils/AppError";
export default function boot(app: Application) {
  app.all("*", (req, res, next) => {
    next(new AppError(`address ${req.originalUrl} not found`, 404));
  });
}
