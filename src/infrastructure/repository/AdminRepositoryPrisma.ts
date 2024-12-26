

import Admin from "../../domain/entities/Admin";
import AdminRepository from "../../domain/repository/AdminRepository";
import { prisma } from "../database/prisma";


export default class AdminRepositoryPrisma implements AdminRepository {

  async create(id: string, admin: Admin): Promise<Admin> {
    return await prisma.admin.create({ data: { id, ...admin } }) as Admin

  }
  async findByEmail(email: string): Promise<Admin | null> {
    return await prisma.admin.findUnique({ where: { email } }) as Admin
  }

  async findById(id: string): Promise<Admin | null> {
    return await prisma.admin.findUnique({ where: { id } }) as Admin
  }

  async update(admin: Admin): Promise<Admin> {
    const updateAdmin = await prisma.admin.update({ where: { id: admin.id }, data: admin });
    return updateAdmin as Admin

  }
  async delete(id: string): Promise<void> {
    await prisma.admin.delete({ where: { id } });
  }

  async updatePasswordByEmail(email: string, password: string): Promise<void> {
    await prisma.admin.update({ where: { email }, data: { password } })
  }
}