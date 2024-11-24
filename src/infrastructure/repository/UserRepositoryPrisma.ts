import User from "../../domain/entities/User";
import UserRepository from "../../domain/repository/UserRepository";
import { prisma } from "../database/prisma";
import { nanoid } from "nanoid";


export default class UserRepositoryPrisma implements UserRepository {

  async create(user: User): Promise<User> {
    const userId = `user-${nanoid(16)}`;
    const createdUser = await prisma.user.create({ data: { id: userId, ...user, } });
    return createdUser as User;
  }
  async findById(id: string): Promise<User> {
    const findUserById = await prisma.user.findUnique({ where: { id } });
    return findUserById as User
  }
  async findByEmail(email: string): Promise<User> {
    const findUserByEmail = await prisma.user.findUnique({ where: { email } });
    return findUserByEmail as User
  }

  async update(user: User): Promise<User> {
    const updatedUser = await prisma.user.update({ where: { id: user.id }, data: user });
    return updatedUser as User
  }

  async updateUserStatus(id: string, isConfirmed: boolean): Promise<void> {
    await prisma.user.update({ where: { id }, data: { isConfirmed } });
  }
  async updatePassword(email: string, password: string): Promise<void> {
    await prisma.user.update({ where: { email }, data: { password } })
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
    return
  }
}