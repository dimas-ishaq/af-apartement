
import NotFoundError from "../../../domain/exceptions/NotFoundError"
import UnitRepository from "../../../domain/repository/UnitRepository"
export default class AdminDeleteUnitUseCase {
    constructor(private unitRepository: UnitRepository) {}
    async execute(id: string): Promise<void> {
        const findUnitById = await this.unitRepository.findById(id)
        if (!findUnitById) {
            throw new NotFoundError("Unit not found")
        }
        await this.unitRepository.delete(id)
    }
}