

import AdminRepository from "../../../../domain/repository/AdminRepository";
import Admin from "../../../../domain/entities/Admin";
import ConflictError from "../../../../domain/exceptions/ConflictError";

export default class AdminRegisterUseCase {
  constructor(
    private adminRepository: AdminRepository
  ) { }

  async execute(id:string,admin: Admin) {
    const { email } = admin;
    const adminExists = await this.adminRepository.findByEmail(email);

    if (adminExists) {
      throw new ConflictError("Admin already exists");
    }

    return await this.adminRepository.create(id, admin);
  }
}