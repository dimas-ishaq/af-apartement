import AdminRepository from "../../../../domain/repository/AdminRepository";
import ResetPasswordRepository from "../../../../domain/repository/ResetPasswordRepository";
import TokenManager from "../../../../infrastructure/service/TokenManager";
import NotFoundError from "../../../../domain/exceptions/NotFoundError";
import { sendResetPasswordEmail } from "../../../../infrastructure/service/NodeMailer";
import BadRequestError from "../../../../domain/exceptions/BadRequestError";

export default class AdminSendResetPasswordUseCase {
  constructor(
    private adminRepository: AdminRepository,
    private resetPasswordRepository: ResetPasswordRepository,
    private tokenManager: TokenManager
  ) {}

  async execute(email: string) {
    const findUserByEmail = await this.adminRepository.findByEmail(email);
    const findResetPasswordByEmail =
      await this.resetPasswordRepository.findByEmail(email);

    if (!findUserByEmail) {
      throw new NotFoundError("User not found");
    }

    if (findResetPasswordByEmail) {
      try{
        const checkToken = this.tokenManager.verifyResetPasswordToken(
          findResetPasswordByEmail.token
        );
        
        if (checkToken && findResetPasswordByEmail.isPinValid === false) {
           throw new BadRequestError("OTP already sent, please check your email");
        }
      }catch(error:any){
        if (error.message === "expired pin") {
          await this.resetPasswordRepository.delete(email);
        }
        throw new BadRequestError(error.message);
      }
     
    }
    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    const token = this.tokenManager.generateResetPasswordToken({ email, pin });
    await this.resetPasswordRepository.create({
      email,
      token,
      isPinValid: false,
    });
    await sendResetPasswordEmail(email, findUserByEmail.name, pin);
  }
}
