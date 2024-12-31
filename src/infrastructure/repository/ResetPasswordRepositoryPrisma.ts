import ResetPassword from "../../domain/entities/ResetPassword";
import ResetPasswordRepository from "../../domain/repository/ResetPasswordRepository";
import { prisma } from "../database/prisma";

export default class ResetPasswordRepositoryPrisma implements ResetPasswordRepository {
  async create(resetPassword: ResetPassword): Promise<void> {
    await prisma.resetPassword.create({ data: resetPassword });
  }

  async findByEmail(email: string): Promise<ResetPassword | null> {
    return await prisma.resetPassword.findUnique({ where: { email } });
  }

  async update(email: string, isPinValid: boolean): Promise<void> {
    await prisma.resetPassword.update({ where: { email }, data: { isPinValid } });
  }

  async delete(email: string): Promise<void> {
    await prisma.resetPassword.delete({ where: { email } })
  }
}