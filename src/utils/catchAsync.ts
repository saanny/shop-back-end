import { Request, Response } from "express";

const catchAsync = (fn: any) => {
  return (req: Request, res: Response, next: any) => {
    fn(req, res, next).catch(next);
  };
};
export default catchAsync;
