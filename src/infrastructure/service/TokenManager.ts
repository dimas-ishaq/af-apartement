import jwt from 'jsonwebtoken';
import AuthenticationError from "../../domain/exceptions/AuthenticationError";
import BadRequestError from '../../domain/exceptions/BadRequestError';

export interface Payload {
  id: string;
  email: string;
  role?: string
}
export interface ResetPasswordPayload {
  email: string;
  pin: string;
}

export default class TokenManager {
  generateToken(payload: Payload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET || "secret", {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET || "secret", {
      expiresIn: "7d",
    })
    return { accessToken, refreshToken };
  }

  generateAccessToken(payload: Payload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET || "secret", {
      expiresIn: "1d"
    })
    return accessToken
  }

  verifyAccessToken(token: string) {
    try {
      const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "secret");
      return payload;
    } catch (error) {
      throw new AuthenticationError("Invalid access token");
    }

  }
  verifyRefreshToken(token: string) {
    try {
      const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET || "secret");
      return payload;
    } catch (error) {
      throw new AuthenticationError("Invalid refresh token");
    }
  }

  generateResetPasswordToken(payload: ResetPasswordPayload) {
    return jwt.sign(payload, process.env.CONFIRMATION_EMAIL_SECRET || "secret", { expiresIn: "5m" });
  }
  verifyResetPasswordToken(token: string) {
    try {
      const payload = jwt.verify(token, process.env.CONFIRMATION_EMAIL_SECRET || "secret");
      return payload
    } catch (error) {
      throw new BadRequestError("Invalid pin or expired pin");
    }
  }

}