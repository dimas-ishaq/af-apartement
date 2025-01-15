import Unit from "../../../domain/entities/Unit";
import UnitRepository from "../../../domain/repository/UnitRepository";
import BuildingRepository from "../../../domain/repository/BuildingRepository";
import NotFoundError from "../../../domain/exceptions/NotFoundError";
import { Status } from "../../../domain/entities/Unit";
import BadRequestError from "../../../domain/exceptions/BadRequestError";
import ConflictError from "../../../domain/exceptions/ConflictError";

export default class AdminUpdateUnitUseCase {
    constructor(
        private unitRepository: UnitRepository,
        private buildingRepository: BuildingRepository,
    ){}

    async execute(id: string, buildingId?: string, name?: string, status?: string): Promise<Unit> {
        const findUnitById = await this.unitRepository.findById(id);
        if (!findUnitById) {
            throw new NotFoundError("Unit not found");
        }
        if(buildingId){
            const findBuildingById = await this.buildingRepository.findById(buildingId);
            if (!findBuildingById) {
                throw new NotFoundError("Building not found");
            }
        }
        if (name) {
            const findUnitByName = await this.unitRepository.findByName(name);
            if (findUnitByName) {
                throw new ConflictError("Unit name already exists");
            }
        }
        if (status && status !== Status.AVAILABLE && status !== Status.UNAVAILABLE) {
            throw new BadRequestError("Status value must be AVAILABLE or UNAVAILABLE");
        }
        
        return await this.unitRepository.update(id, buildingId, name, status );
    }
 }