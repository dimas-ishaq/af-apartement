import BadRequestError from "../../../../domain/exceptions/BadRequestError";
import UserRepository from "../../../../domain/repository/UserRepository";
import PasswordHash from "../../../../infrastructure/service/PasswordHash";
import ResetPasswordRepository from "../../../../domain/repository/ResetPasswordRepository";

export default class UserUpdatePasswordUseCase {
  constructor(
    private userRepository: UserRepository,
    private passwordHash: PasswordHash,
    private userResetPasswordRepository: ResetPasswordRepository
  ) { }

  async execute(email: string, newPassword: string) {
    try {
      const hashedPassword = await this.passwordHash.hash(newPassword);
      await this.userResetPasswordRepository.delete(email);
      await this.userRepository.updatePasswordByEmail(email, hashedPassword);
    } catch (error:any) {
      throw new BadRequestError("Password change request cannot be processed")
    }
   
  }
}