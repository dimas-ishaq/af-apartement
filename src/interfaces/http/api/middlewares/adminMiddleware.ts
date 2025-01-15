
import { Request, Response, NextFunction } from "express";
import TokenManager from "../../../../infrastructure/service/TokenManager";
import AuthenticationError from "../../../../domain/exceptions/AuthenticationError";
import { Payload } from "../../../../infrastructure/service/TokenManager";
import { Role } from "../../../../domain/entities/Session";

interface CustomRequest extends Request {
  payload?: string | object
}
export default function adminMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
  const tokenManager = new TokenManager();
  const authHeader = req.headers.authorization
  if (!authHeader) {
    throw new AuthenticationError('Unauthorized')
  }
  const accessToken = authHeader?.split(' ')[1]
  if (!accessToken) {
    throw new AuthenticationError('Unauthorized')
  }
  try {
    const payload = tokenManager.verifyAccessToken(accessToken) as Payload
    if (payload?.role !== Role.ADMIN) {
      throw new AuthenticationError('Unauthorized')
    }
    req.payload = payload
    next()
  } catch (error) {
    next(error)
  }
}