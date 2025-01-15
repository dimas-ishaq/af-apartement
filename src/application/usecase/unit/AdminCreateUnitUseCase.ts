import Unit from "../../../domain/entities/Unit";
import UnitRepository from "../../../domain/repository/UnitRepository";
import ConflictError from "../../../domain/exceptions/ConflictError";
import BuildingRepository from "../../../domain/repository/BuildingRepository";
import NotFoundError from "../../../domain/exceptions/NotFoundError";

export default class AdminCreateUnitUseCase {
    constructor(
        private unitRepository: UnitRepository,
        private buildingRepository: BuildingRepository
    ){}

    async execute(id: string, unit: Unit): Promise<Unit> {
        const findUnitByName = await this.unitRepository.findByName(unit.name);
        const findBuildingById = await this.buildingRepository.findById(unit.buildingId);
        if(findUnitByName){
            throw new ConflictError("Unit already exists");
        }
        if(!findBuildingById){
            throw new NotFoundError("Building not found");
        }
        return await this.unitRepository.create(id, unit);
    }
}