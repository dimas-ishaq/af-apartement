import { Request, Response, NextFunction } from "express";
import UserRegisterUseCase from "../../../../application/usecase/auth/user/UserRegisterUseCase";
import UserLoginUseCase from "../../../../application/usecase/auth/user/UserLoginUseCase";
import UserLogoutUseCase from "../../../../application/usecase/auth/user/UserLogoutUseCase";
import {
  userSchema, userLoginSchema,
  userReqAccessTokenSchema,
  userRequestResetPasswordSchema,
  userVerifyResetPasswordSchema,
  userUpdatePasswordSchema
} from "../validations/user/userSchema";
import BadRequestError from "../../../../domain/exceptions/BadRequestError";
import PasswordHash from "../../../../infrastructure/service/PasswordHash";
import AuthenticationError from "../../../../domain/exceptions/AuthenticationError";
import ReqNewAccessTokenUseCase from "../../../../application/usecase/auth/ReqNewAccessTokenUseCase";
import UserSendConfirmationEmailUseCase from "../../../../application/usecase/auth/user/UserSendConfirmationEmailUseCase";
import UserUpdateConfirmationEmailUseCase from "../../../../application/usecase/auth/user/UserUpdateConfirmationEmailUseCase";
import UserSendResetPasswordUseCase from "../../../../application/usecase/auth/user/UserSendResetPasswordUseCase";
import VerifyResetPasswordUseCase from "../../../../application/usecase/auth/VerifyResetPasswordUseCase";
import UserUpdatePasswordUseCase from "../../../../application/usecase/auth/user/UserUpdatePasswordUseCase";
import { apiPath } from "../../../../config/paths";
import path = require("path");
import { nanoid } from "nanoid";


interface CustomRequest extends Request {
  payload?: string | object
}

export default class UserAuthController {
  constructor(
    private userRegisterUseCase: UserRegisterUseCase,
    private userSendConfirmationEmailUseCase: UserSendConfirmationEmailUseCase,
    private userUpdateConfirmationEmailUseCase: UserUpdateConfirmationEmailUseCase,
    private userSendResetPasswordUseCase: UserSendResetPasswordUseCase,
    private userUpdatePasswordUseCase: UserUpdatePasswordUseCase,
    private userLoginUseCase: UserLoginUseCase,
    private userLogoutUseCase: UserLogoutUseCase,
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
      const id = `user-${nanoid(16)}`
      const hashedPassword = await this.passwordHash.hash(req.body.password);
      const registeredUser = await this.userRegisterUseCase.execute(id, { ...req.body, password: hashedPassword, isConfirmed: false });
      await this.userSendConfirmationEmailUseCase.execute(registeredUser.id ?? '', registeredUser.email, registeredUser.name);
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
      const { error } = userLoginSchema.validate(req.body);
      if (error) {
        throw new BadRequestError(error.message);
      }
      const token = await this.userLoginUseCase.execute(req.body);
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
      const { error } = userReqAccessTokenSchema.validate(req.body);
      if (error) {
        throw new BadRequestError(error.message)
      }
      const accessToken = await this.reqNewAccessTokenUseCase.execute(req.body.refreshToken);
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
        return res.sendFile(path.join(apiPath, 'website', 'errorConfirmationEmail.html'));
      }
      try {
        await this.userUpdateConfirmationEmailUseCase.execute(user as string);
        return res.sendFile(path.join(apiPath, 'website', 'confirmationEmail.html'));
      } catch (error) {
        return res.sendFile(path.join(apiPath, 'website', 'errorConfirmationEmail.html'));
      }
    } catch (error) {
      next(error)
    }
  }

  async requestResetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = userRequestResetPasswordSchema.validate(req.body)
      if (error) {
        throw new BadRequestError(error.message)
      }
      await this.userSendResetPasswordUseCase.execute(req.body.email);
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
      const { error } = userVerifyResetPasswordSchema.validate(req.body)
      if (error) {
        throw new BadRequestError(error.message)
      }
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
      const { error } = userUpdatePasswordSchema.validate(req.body)
      if (error) {
        throw new BadRequestError(error.message);
      }
      await this.userUpdatePasswordUseCase.execute(req.body.email, req.body.newPassword)
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
      await this.userLogoutUseCase.execute(id);
      return res.status(200).json({
        status: "success",
        message: "User logged out successfully"
      });
    } catch (error) {
      next(error)
    }
  }
}