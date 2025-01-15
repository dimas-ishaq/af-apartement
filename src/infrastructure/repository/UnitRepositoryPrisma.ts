import Unit from "../../domain/entities/Unit";
import UnitRepository from "../../domain/repository/UnitRepository";
import { prisma } from "../database/prisma";

export default class UnitRepositoryPrisma implements UnitRepository{
   
    async create(id: string, unit: Unit): Promise<Unit> {
        return await prisma.unit.create({ data: { id, ...unit, } }) as Unit;
    }
    async update(id: string, buildingId?: string, name?: string, status?: string): Promise<Unit> {
       return await prisma.unit.update({ where: { id }, data: {buildingId, name, status} }) as Unit;
    }
    async delete(id: string): Promise<void> {
        await prisma.unit.delete({ where: { id } });
    }
    async findById(id: string): Promise<Unit | null> {
       return await prisma.unit.findUnique({ where: { id } }) as Unit;
    }
    async findByName(name: string): Promise<Unit | null> {
        return await prisma.unit.findFirst({ where: { name } });
    }
    async findByBuildingId(buildingId: string): Promise<Unit[] | null> {
        return await prisma.unit.findMany({ where: { buildingId } });
    }
    async findAll(): Promise<Unit[] | null> {
        return await prisma.unit.findMany();
    }
    
}