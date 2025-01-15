import UnitRepository from "../../../domain/repository/UnitRepository";
import BuildingRepository from "../../../domain/repository/BuildingRepository";
import Unit from "../../../domain/entities/Unit";
import NotFoundError from "../../../domain/exceptions/NotFoundError";

export default class AdminFindUnitByBuildingNameUseCase {
    constructor(
        private buildingRepository: BuildingRepository,
        private unitRepository:UnitRepository,
    ) {}

    async execute(buildingName: string): Promise<Unit[] | null> {
        const findBuildingByName = await this.buildingRepository.findByName(buildingName);
        const buildingId = findBuildingByName?.id ?? null;
        if (buildingId) {
            return await this.unitRepository.findByBuildingId(buildingId);
        }
        throw new NotFoundError("Building not found");
    }
}