import BadRequestError from "../../../../domain/exceptions/BadRequestError";
import AdminRepository from "../../../../domain/repository/AdminRepository";
import PasswordHash from "../../../../infrastructure/service/PasswordHash";

export default class AdminUpdatePasswordUseCase {
  constructor(
    private adminRepository: AdminRepository,
    private passwordHash: PasswordHash
  ) { }

  async execute(email: string, newPassword: string) {
    const hashedPassword = await this.passwordHash.hash(newPassword);
    await this.adminRepository.updatePasswordByEmail(email, hashedPassword);
  }
}