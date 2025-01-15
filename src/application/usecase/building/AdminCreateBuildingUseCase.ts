import BuildingRepository from "../../../domain/repository/BuildingRepository";
import Building from "../../../domain/entities/Building";
import ConflictError from "../../../domain/exceptions/ConflictError";
import CategoryRepository from "../../../domain/repository/CategoryRepository";
import NotFoundError from "../../../domain/exceptions/NotFoundError";

export default class AdminCreateBuildingUseCase {
  constructor(
    private buildingRepository: BuildingRepository,
    private categoryRepository: CategoryRepository
  ) { }

  async execute(id: string, building: Building): Promise<Building> {
    const findCategoryById = await this.categoryRepository.findById(building.categoryId)
    if (!findCategoryById) {
      throw new NotFoundError("Category not found")
    }
    const findBuildingByName = await this.buildingRepository.findByName(building.name)
    if (findBuildingByName) {
      throw new ConflictError("Building already exists")
    }
    return await this.buildingRepository.create(id, building)
  }
}