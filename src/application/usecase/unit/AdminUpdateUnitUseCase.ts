import Unit from "../../../domain/entities/Unit";
import UnitRepository from "../../../domain/repository/UnitRepository";
import BuildingRepository from "../../../domain/repository/BuildingRepository";
import PriceCategoryRepository from "../../../domain/repository/PriceCategoryRepository";
import NotFoundError from "../../../domain/exceptions/NotFoundError";

export default class AdminUpdateUnitUseCase {
    constructor(
        private unitRepository: UnitRepository,
        private buildingRepository: BuildingRepository,
        private priceCategoryRepository:PriceCategoryRepository
    ){}

    async execute(id: string, unit: Unit): Promise<Unit> {
        const findUnitById = await this.unitRepository.findById(id);
        const findBuildingById = await this.buildingRepository.findById(unit.id_building);
        const findPriceCategoryById = await this.priceCategoryRepository.findById(unit.id_priceCategory);
        if (!findUnitById) {
            throw new NotFoundError("Unit not found");
        }
        if (!findBuildingById) {
            throw new NotFoundError("Building not found");
        }
        if (!findPriceCategoryById) {
            throw new NotFoundError("PriceCategory not found");
        }
        return await this.unitRepository.update(id, unit);
    }
 }