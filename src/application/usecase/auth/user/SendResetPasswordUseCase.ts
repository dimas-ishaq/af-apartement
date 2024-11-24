
import NotFoundError from "../../../../domain/exceptions/NotFoundError";
import ResetPasswordRepository from "../../../../domain/repository/ResetPasswordRepository";
import UserRepository from "../../../../domain/repository/UserRepository";
import { sendResetPasswordEmail } from "../../../../infrastructure/service/NodeMailer";
import TokenManager from "../../../../infrastructure/service/TokenManager";

export default class SendResetPasswordUseCase {
  constructor(
    private userRepository: UserRepository,
    private resetPasswordRepository: ResetPasswordRepository,
    private tokenManager: TokenManager,
  ) { }

  async execute(email: string) {
    const findUserByEmail = await this.userRepository.findByEmail(email);

    if (!findUserByEmail) {
      throw new NotFoundError("User not found")
    }
    
    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    const token = this.tokenManager.generateResetPasswordToken({ email, pin });
    await this.resetPasswordRepository.create({ email, token, isValidPin: false });
    await sendResetPasswordEmail(email, findUserByEmail.name, pin);
  }
}