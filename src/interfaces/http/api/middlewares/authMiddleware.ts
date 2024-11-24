
import { Request, Response, NextFunction } from "express";
import TokenManager from "../../../../infrastructure/service/TokenManager";
import AuthenticationError from "../../../../domain/exceptions/AuthenticationError";

interface CustomRequest extends Request {
  payload?: string | object
}
export default function authMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
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
    const payload = tokenManager.verifyAccessToken(accessToken)
    req.payload = payload
    next()
  } catch (error) {
    next(error)
  }
}