import PriceCategory from "../../domain/entities/PriceCategory";
import PriceCategoryRepository from "../../domain/repository/PriceCategoryRepository";
import { prisma } from "../database/prisma";


export default class PriceCategoryRepositoryPrisma implements PriceCategoryRepository {
  async create(id:string,priceCategory: PriceCategory): Promise<PriceCategory> {
    return await prisma.priceCategory.create({ data: { id, ...priceCategory } })
  }
  async update(id: string, name: string): Promise<PriceCategory> {
    return await prisma.priceCategory.update({ where: { id }, data: { name } })
  }
  async delete(id: string): Promise<void> {
    await prisma.priceCategory.delete({ where: { id } })
  }
  async findById(id: string): Promise<PriceCategory | null> {
    return await prisma.priceCategory.findUnique({ where: { id } })
  }
  async findAll(): Promise<PriceCategory[] | null> {
    return await prisma.priceCategory.findMany()
  }
  async findByName(name: string): Promise<PriceCategory | null> {
    return await prisma.priceCategory.findFirst({ where: { name } })
  }

}