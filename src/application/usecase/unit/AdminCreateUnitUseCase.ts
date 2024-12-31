import Unit from "../../../domain/entities/Unit";
import UnitRepository from "../../../domain/repository/UnitRepository";

export default class AdminCreateUnitUseCase {
    constructor(private unitRepository: UnitRepository){}

    async execute(id: string, unit: Unit): Promise<Unit> {
        return await this.unitRepository.create(id, unit);
    }
}