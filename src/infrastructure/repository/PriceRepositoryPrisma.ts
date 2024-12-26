
import Price from "../../domain/entities/Price";
import PriceRepository from "../../domain/repository/PriceRepository";
import { prisma } from "../database/prisma";

export default class PriceRepositoryPrisma implements PriceRepository {
  async create(id: string, price: Price): Promise<Price> {
    return await prisma.price.create({ data: { id, ...price } })
  }
  async update(id: string, name?: string, price?: number): Promise<Price> {
    return await prisma.price.update({ where: { id }, data: { name, price } })
  }
  async delete(id: string): Promise<void> {
    await prisma.price.delete({ where: { id } })
  }
  async findAll(): Promise<Price[] | null> {
    return await prisma.price.findMany()
  }
  async findById(id: string): Promise<Price | null> {
    return await prisma.price.findUnique({ where: { id } })
  }
  async findByName(name: string): Promise<Price | null> {
    return await prisma.price.findFirst({ where: { name } })
  }
}