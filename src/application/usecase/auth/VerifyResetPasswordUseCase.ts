import BadRequestError from "../../../domain/exceptions/BadRequestError";
import TokenManager, { ResetPasswordPayload } from "../../../infrastructure/service/TokenManager";
import ResetPasswordRepository from "../../../domain/repository/ResetPasswordRepository";
import ResetPassword from "../../../domain/entities/ResetPassword";

export default class VerifyResetPasswordUseCase {
  constructor(
    private resetPasswordRepository: ResetPasswordRepository,
    private tokenManager: TokenManager

  ) { }

  async execute(email: string, pin: string) {
  
    const { token } = await this.resetPasswordRepository.findByEmail(email) as ResetPassword
    const payload = this.tokenManager.verifyResetPasswordToken(token) as ResetPasswordPayload

    if (payload.pin !== pin) {
      throw new BadRequestError("Invalid pin")
    }
    const isValidPin = true;
    await this.resetPasswordRepository.update(email, isValidPin);
  }
}