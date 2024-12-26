import Category from "../../domain/entities/Category";
import CategoryRepository from "../../domain/repository/CategoryRepository";
import { prisma } from "../database/prisma";


export default class CategoryRepositoryPrisma implements CategoryRepository {

  async create(id: string, category: Category): Promise<Category> {
    return await prisma.category.create({ data: { id, ...category } })
  }
  async update(id: string, name?: string, image?: string): Promise<Category> {
    return await prisma.category.update({ where: { id }, data: { name, image } })
  }
  async delete(id: string): Promise<void> {
    await prisma.category.delete({ where: { id } })
  }
  async findAll(): Promise<Category[] | null> {
    return await prisma.category.findMany()
  }

  async findById(id: string): Promise<Category | null> {
    return await prisma.category.findUnique({ where: { id } })
  }

  async findByName(name: string): Promise<Category | null> {
    return await prisma.category.findFirst({ where: { name } })
  }

}