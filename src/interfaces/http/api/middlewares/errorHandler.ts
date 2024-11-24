
import { Request, Response, NextFunction } from "express";
import CustomError from "../../../../domain/exceptions/CustomError";

export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }
  console.log(err)
  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  })
}