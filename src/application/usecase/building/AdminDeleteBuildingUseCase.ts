import BuildingRepository from "../../../domain/repository/BuildingRepository";
import NotFoundError from "../../../domain/exceptions/NotFoundError";


export default class AdminDeleteBuildingUseCase {
  constructor(
    private buildingRepository: BuildingRepository
  ) { }

  async execute(id: string): Promise<void> {
    const findBuilding = await this.buildingRepository.findById(id)
    if (!findBuilding) {
      throw new NotFoundError("Building not found")
    }
    await this.buildingRepository.delete(id)
  }
}