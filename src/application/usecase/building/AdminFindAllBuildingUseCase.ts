import BuildingRepository from "../../../domain/repository/BuildingRepository";
import Building from "../../../domain/entities/Building";


export default class AdminFindAllBuildingUseCase {
  constructor(private buildingRepository: BuildingRepository) { }

  async execute(): Promise<Building[] | null> {
    return await this.buildingRepository.findAll()
  }
}