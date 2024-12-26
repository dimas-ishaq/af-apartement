import User from "../../domain/entities/User";
import UserRepository from "../../domain/repository/UserRepository";
import { prisma } from "../database/prisma";
import { nanoid } from "nanoid";


export default class UserRepositoryPrisma implements UserRepository {

  async create(id: string, user: User): Promise<User> {
    return await prisma.user.create({ data: { id, ...user, } }) as User;
  }
  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id } }) as User;
  }
  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email } }) as User;
  }

  async update(id: string, user: User): Promise<User> {
    return await prisma.user.update({ where: { id }, data: user }) as User;
  }

  async updateUserStatus(id: string, isConfirmed: boolean): Promise<void> {
    await prisma.user.update({ where: { id }, data: { isConfirmed } });
  }
  async updatePasswordByEmail(email: string, password: string): Promise<void> {
    await prisma.user.update({ where: { email }, data: { password } })
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
    return
  }
}