import BuildingRepository from "../../../domain/repository/BuildingRepository";
import Building from "../../../domain/entities/Building";
import ConflictError from "../../../domain/exceptions/ConflictError";

export default class AdminCreateBuildingUseCase {
  constructor(
    private buildingRepository: BuildingRepository
  ) { }

  async execute(id: string, building: Building): Promise<Building> {
    const findBuildingByName = await this.buildingRepository.findByName(building.name)
    if (findBuildingByName) {
      throw new ConflictError("Building already exists")
    }
    return await this.buildingRepository.create(id, building)
  }
}