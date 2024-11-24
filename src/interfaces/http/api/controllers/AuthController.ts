import { Request, Response, NextFunction } from "express";
import RegisterUseCase from "../../../../application/usecase/auth/user/RegisterUseCase";
import LoginUseCase from "../../../../application/usecase/auth/user/LoginUseCase";
import LogoutUseCase from "../../../../application/usecase/auth/user/LogoutUseCase";
import { userSchema, loginSchema } from "../validations/user/userSchema";
import BadRequestError from "../../../../domain/exceptions/BadRequestError";
import PasswordHash from "../../../../infrastructure/service/PasswordHash";
import AuthenticationError from "../../../../domain/exceptions/AuthenticationError";
import ReqNewAccessTokenUseCase from "../../../../application/usecase/auth/user/ReqNewAccessTokenUseCase";
import SendConfirmationEmailUseCase from "../../../../application/usecase/auth/user/SendConfirmationEmailUseCase";
import UpdateConfirmationEmailUseCase from "../../../../application/usecase/auth/user/UpdateConfirmationEmailUseCase";
import SendResetPasswordUseCase from "../../../../application/usecase/auth/user/SendResetPasswordUseCase";
import VerifyResetPasswordUseCase from "../../../../application/usecase/auth/user/VerifyResetPasswordUseCase";
import UpdatePasswordUseCase from "../../../../application/usecase/auth/user/UpdatePasswordUseCase";


interface CustomRequest extends Request {
  payload?: string | object
}

export default class AuthController {
  constructor(
    private registerUseCase: RegisterUseCase,
    private sendConfirmationEmailUseCase: SendConfirmationEmailUseCase,
    private updateConfirmationEmailUseCase: UpdateConfirmationEmailUseCase,
    private sendResetPasswordUseCase: SendResetPasswordUseCase,
    private updatePasswordUseCase: UpdatePasswordUseCase,
    private loginUseCase: LoginUseCase,
    private logoutUseCase: LogoutUseCase,
    private reqNewAccessTokenUseCase: ReqNewAccessTokenUseCase,
    private verifyResetPasswordUseCase: VerifyResetPasswordUseCase,
    private passwordHash: PasswordHash,
  ) { }

  async register(req: Request, res: Response, next: NextFunction) {
    try {

      const { error } = userSchema.validate(req.body);
      if (error) {
        throw new BadRequestError(error.message);
      }
      const hashedPassword = await this.passwordHash.hash(req.body.password);
      const registeredUser = await this.registerUseCase.execute({ ...req.body, password: hashedPassword, isConfirmed: false });
      await this.sendConfirmationEmailUseCase.execute(registeredUser.id ?? '', registeredUser.email, registeredUser.name);
      const response = {
        id: registeredUser.id,
        email: registeredUser.email,
        name: registeredUser.name
      }
      return res.status(201).json({
        status: "success",
        message: "User registered successfully",
        data: response
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = loginSchema.validate(req.body);
      if (error) {
        throw new BadRequestError(error.message);
      }
      const token = await this.loginUseCase.execute(req.body);
      return res.status(200).json({
        status: "success",
        message: "User logged in successfully",
        data: {
          accessToken: token?.accessToken,
          refreshToken: token?.refreshToken
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async requestAccessToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        throw new BadRequestError("Invalid refresh token")
      }
      const accessToken = await this.reqNewAccessTokenUseCase.execute(refreshToken);
      return res.status(200).json({
        status: 'success',
        data: {
          accessToken
        }
      })
    } catch (error) {
      next(error)
    }
  }

  async userConfirmation(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = req.query;
      if (!user) {
        const htmlContent = `<html><body><h1>Link konfirmasi tidak valid. Silakan klik kembali link konfirmasi yang telah dikirimkan ke email anda.</h1></body></html>`;
        return res.send(htmlContent)
      }
      try {
        await this.updateConfirmationEmailUseCase.execute(user as string);
        const htmlContent = `<html><body><h1>Konfirmasi Email Berhasil. Silakan login pada aplikasi AF Apartement </h1></body></html>`;
        return res.send(htmlContent)
      } catch (error) {
        const htmlContent = `<html><body><h1>Data anda tidak ditemukan. Silakan klik kembali link konfirmasi yang telah dikirimkan ke email anda.</h1></body></html>`;
        return res.send(htmlContent)
      }
    } catch (error) {
      next(error)
    }
  }

  async requestResetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      if (!email) {
        throw new BadRequestError("Invalid email")
      }
      await this.sendResetPasswordUseCase.execute(email);
      return res.status(200).json({
        status: "success",
        message: "OTP Reset password email sent successfully"
      })
    } catch (error) {
      next(error)
    }
  }

  async verifyResetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      await this.verifyResetPasswordUseCase.execute(req.body.email, req.body.pin);
      return res.status(200).json({
        status: "success",
        message: "Verify reset password successfully"
      })
    } catch (error) {
      next(error)
    }
  }

  async updatePassword(req: Request, res: Response, next: NextFunction) {
    try {
      await this.updatePasswordUseCase.execute(req.body.email, req.body.newPassword)
      return res.status(200).json({
        status: "success",
        message: "Update password successfully"
      })
    } catch (error) {
      next(error)
    }
  }

  async logout(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.payload as { id: string }
      if (!id) {
        throw new AuthenticationError('Unauthorized')
      }
      await this.logoutUseCase.execute(id);
      return res.status(200).json({
        status: "success",
        message: "User logged out successfully"
      });
    } catch (error) {
      next(error)
    }
  }
}