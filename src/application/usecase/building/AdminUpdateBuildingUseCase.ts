import BuildingRepository from "../../../domain/repository/BuildingRepository";
import Building from "../../../domain/entities/Building";
import NotFoundError from "../../../domain/exceptions/NotFoundError";
import ConflictError from "../../../domain/exceptions/ConflictError";


export default class AdminUpdateBuildingUseCase {
  constructor(
    private buildingRepository: BuildingRepository
  ) { }

  async execute(id: string, name?: string, categoryId?: string): Promise<Building> {
    const findBuildingById = await this.buildingRepository.findById(id);
    if (!findBuildingById) {
      throw new NotFoundError("Building not found")
    }
    if (name) {
      const findBuildingByName = await this.buildingRepository.findByName(name);
      if (findBuildingByName) {
        throw new ConflictError("Building name already exists")
      }
    }
    if (categoryId) {
      const findCategoryById = await this.buildingRepository.findById(categoryId);
      if (!findCategoryById) {
        throw new NotFoundError("Category not found")
      }
    }
    return await this.buildingRepository.update(id, name, categoryId)
  }
}