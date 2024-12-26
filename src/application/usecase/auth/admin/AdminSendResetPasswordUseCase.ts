
import AdminRepository from "../../../../domain/repository/AdminRepository";
import ResetPasswordRepository from "../../../../domain/repository/ResetPasswordRepository";
import TokenManager from "../../../../infrastructure/service/TokenManager";
import NotFoundError from "../../../../domain/exceptions/NotFoundError";
import { sendResetPasswordEmail } from "../../../../infrastructure/service/NodeMailer";


export default class AdminSendResetPasswordUseCase {
  constructor(
    private adminRepository: AdminRepository,
    private resetPasswordRepository: ResetPasswordRepository,
    private tokenManager: TokenManager,
  ) { }

  async execute(email: string) {
    const findUserByEmail = await this.adminRepository.findByEmail(email);

    if (!findUserByEmail) {
      throw new NotFoundError("User not found")
    }

    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    const token = this.tokenManager.generateResetPasswordToken({ email, pin });
    await this.resetPasswordRepository.create({ email, token, isValidPin: false });
    await sendResetPasswordEmail(email, findUserByEmail.name, pin);
  }
}