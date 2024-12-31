
import Unit from "../../../domain/entities/Unit"
import UnitRepository from "../../../domain/repository/UnitRepository"

export default class AdminFindAllUnitUseCase {
    constructor(private unitRepository: UnitRepository) { } 
    async execute(): Promise<Unit[] | null> {
        return await this.unitRepository.findAll()
    }
}