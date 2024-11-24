
import BadRequestError from "../../../../domain/exceptions/BadRequestError";
import UserRepository from "../../../../domain/repository/UserRepository";
import PasswordHash from "../../../../infrastructure/service/PasswordHash";
export default class UpdatePasswordUseCase {
  constructor(
    private userRepository: UserRepository,
    private passwordHash: PasswordHash
  ) { }

  async execute(email: string, newPassword: string) {
    if (!email || !newPassword) {
      throw new BadRequestError("Invalid email or password");
    }
    const hashedPassword = await this.passwordHash.hash(newPassword);
    await this.userRepository.updatePassword(email, hashedPassword);
  }
}