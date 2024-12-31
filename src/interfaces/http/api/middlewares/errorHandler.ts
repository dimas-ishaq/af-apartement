import { Request, Response, NextFunction } from "express";
import CustomError from "../../../../domain/exceptions/CustomError";

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  // Cek jika error merupakan CustomError (misalnya error kustom dengan status code tertentu)
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  // Cek jika error merupakan masalah parsing JSON (misalnya body tidak valid)
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({
      status: "error",
      message: "The request body must be in a valid JSON format.",
    });
  }

  // Cek error internal server lainnya (untuk masalah di dalam aplikasi)
  console.error(err); // Menyimpan log error untuk debugging
  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
}
