
import BadRequestError from "../../../../domain/exceptions/BadRequestError";
import UserRepository from "../../../../domain/repository/UserRepository";
import PasswordHash from "../../../../infrastructure/service/PasswordHash";

export default class UserUpdatePasswordUseCase {
  constructor(
    private userRepository: UserRepository,
    private passwordHash: PasswordHash
  ) { }

  async execute(email: string, newPassword: string) {
    const hashedPassword = await this.passwordHash.hash(newPassword);
    await this.userRepository.updatePasswordByEmail(email, hashedPassword);
  }
}