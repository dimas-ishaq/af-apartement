import UnitImageRepository from "../../domain/repository/UnitImageRepository";
import UnitImage from "../../domain/entities/UnitImage";
import { prisma } from "../database/prisma";

export default class UnitImageRepositoryPrisma implements UnitImageRepository {
  async create(id: string, unitImage: UnitImage): Promise<UnitImage> {
    return await prisma.unitImage.create({ data: { id, ...unitImage } });
  }
  async update(id: string, unitId?: string, image?: string): Promise<UnitImage> {
    return await prisma.unitImage.update({ where: { id }, data: { unitId, image } });
  }
  async delete(id: string): Promise<void> {
    await prisma.unitImage.delete({ where: { id } });
  }
  async findById(id: string): Promise<UnitImage | null> {
    return await prisma.unitImage.findUnique({ where: { id } });
  }
  async findByUnitId(unitId: string): Promise<UnitImage[] | null> {
    return await prisma.unitImage.findMany({ where: { unitId } });
  }

}