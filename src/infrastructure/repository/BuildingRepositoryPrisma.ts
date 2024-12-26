import Building from "../../domain/entities/Building";
import BuildingRepository from "../../domain/repository/BuildingRepository";
import { prisma } from "../database/prisma";



export default class BuildingRepositoryPrisma implements BuildingRepository {
  async create(id: string, building: Building): Promise<Building> {
    return await prisma.building.create({ data: { id, ...building } })
  }
  async update(id: string, name?: string, id_category?: string): Promise<Building> {
    return await prisma.building.update({ where: { id }, data: { name, id_category } })
  }
  async delete(id: string): Promise<void> {
    await prisma.building.delete({ where: { id } });
  }
  async findAll(): Promise<Building[] | null> {
    return await prisma.building.findMany()
  }
  async findById(id: string): Promise<Building | null> {
    return await prisma.building.findUnique({ where: { id } })
  }
  async findByName(name: string): Promise<Building | null> {
    return await prisma.building.findFirst({ where: { name } })
  }
  async findByCategoryId(id_category: string): Promise<Building[] | null> {
    return await prisma.building.findMany({ where: { id_category } })
  }

}