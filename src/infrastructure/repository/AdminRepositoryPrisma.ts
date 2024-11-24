

import Admin from "../../domain/entities/Admin";
import AdminRepository from "../../domain/repository/AdminRepository";
import { prisma } from "../database/prisma";
import { nanoid } from "nanoid";

export default class AdminRepositoryPrisma implements AdminRepository {

  async create(admin: Admin): Promise<Admin> {
    const adminId = `admin-${nanoid(16)}`
    const createAdmin = await prisma.admin.create({ data: { id: adminId, ...admin } });
    return createAdmin as Admin

  }
  async update(admin: Admin): Promise<Admin> {
    const updateAdmin = await prisma.admin.update({ where: { id: admin.id }, data: admin });
    return updateAdmin as Admin

  }
  async delete(id: string): Promise<void> {
    await prisma.admin.delete({ where: { id } });
  }
}