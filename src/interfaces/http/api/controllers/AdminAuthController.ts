
import AdminRegisterUseCase from "../../../../application/usecase/auth/admin/AdminRegisterUseCase";
import AdminLoginUseCase from "../../../../application/usecase/auth/admin/AdminLoginUseCase";
import AdminLogoutUseCase from "../../../../application/usecase/auth/admin/AdminLogoutUseCase";
import AdminSendResetPasswordUseCase from "../../../../application/usecase/auth/admin/AdminSendResetPasswordUseCase";
import AdminUpdatePasswordUseCase from "../../../../application/usecase/auth/admin/AdminUpdatePasswordUseCase";
import VerifyResetPasswordUseCase from "../../../../application/usecase/auth/VerifyResetPasswordUseCase";
import PasswordHash from "../../../../infrastructure/service/PasswordHash";
import { Request, Response, NextFunction } from "express";
import {
  adminSchema,
  adminLoginSchema,
  adminReqAccessTokenSchema,
  adminRequestResetPasswordSchema,
  adminVerifyResetPasswordSchema,
  adminUpdatePasswordSchema
} from "../validations/admin/adminSchema";
import BadRequestError from "../../../../domain/exceptions/BadRequestError";
import ReqNewAccessTokenUseCase from "../../../../application/usecase/auth/ReqNewAccessTokenUseCase";
import { nanoid } from "nanoid";

interface CustomRequest extends Request {
  payload?: string | object
}
export default class AdminAuthController {

  constructor(
    private adminRegisterUseCase: AdminRegisterUseCase,
    private adminLoginUseCase: AdminLoginUseCase,
    private adminLogoutUseCase: AdminLogoutUseCase,
    private adminSendResetPasswordUseCase: AdminSendResetPasswordUseCase,
    private adminUpdatePasswordUseCase: AdminUpdatePasswordUseCase,
    private reqNewAccessTokenUseCase: ReqNewAccessTokenUseCase,
    private verifyResetPasswordUseCase: VerifyResetPasswordUseCase,
    private passwordHash: PasswordHash
  ) { }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = adminSchema.validate(req.body)
      if (error) {
        throw new BadRequestError(error.message)
      }
      const id = `admin-${nanoid(16)}`
      const hashedPassword = await this.passwordHash.hash(req.body.password);
      const registeredAdmin = await this.adminRegisterUseCase.execute(id, { ...req.body, password: hashedPassword });
      return res.status(201).json({
        status: "success",
        message: "Admin registered successfully",
        data: {
          userId: registeredAdmin.id,
          email: registeredAdmin.email,
          name: registeredAdmin.name
        }
      })
    } catch (error) {
      next(error)
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = adminLoginSchema.validate(req.body)
      if (error) {
        throw new BadRequestError(error.message)
      }
      const token = await this.adminLoginUseCase.execute(req.body);
      return res.status(200).json({
        status: "success",
        message: "Admin logged in successfully",
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
      const { error } = adminReqAccessTokenSchema.validate(req.body)
      if (error) {
        throw new BadRequestError(error.message)
      }
      const token = await this.reqNewAccessTokenUseCase.execute(req.body.refreshToken);
      return res.status(200).json({
        status: "success",
        data: {
          accessToken: token
        }
      })
    } catch (error) {
      next(error)
    }
  }

  async requestResetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = adminRequestResetPasswordSchema.validate(req.body)
      if (error) {
        throw new BadRequestError(error.message)
      }
      await this.adminSendResetPasswordUseCase.execute(req.body.email);
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
      const { error } = adminVerifyResetPasswordSchema.validate(req.body)
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
      const { error } = adminUpdatePasswordSchema.validate(req.body)
      if (error) {
        throw new BadRequestError(error.message);
      }
      await this.adminUpdatePasswordUseCase.execute(req.body.email, req.body.newPassword)
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
        throw new BadRequestError('Unauthorized')
      }
      await this.adminLogoutUseCase.execute(id);
      return res.status(200).json({
        status: "success",
        message: "Admin logged out successfully"
      });
    } catch (error) {
      next(error)
    }
  }
}