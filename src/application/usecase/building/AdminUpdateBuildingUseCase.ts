import BuildingRepository from "../../../domain/repository/BuildingRepository";
import Building from "../../../domain/entities/Building";
import NotFoundError from "../../../domain/exceptions/NotFoundError";


export default class AdminUpdateBuildingUseCase {
  constructor(
    private buildingRepository: BuildingRepository
  ) { }

  async execute(id: string, name?: string, id_category?: string): Promise<Building> {
    const findBuildingById = await this.buildingRepository.findById(id);
    if (!findBuildingById) {
      throw new NotFoundError("Building not found")
    }
    return await this.buildingRepository.update(id, name, id_category)
  }
}