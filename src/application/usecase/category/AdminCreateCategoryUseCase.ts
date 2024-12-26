import CategoryRepository from "../../../domain/repository/CategoryRepository";
import Category from "../../../domain/entities/Category";
import ConflictError from "../../../domain/exceptions/ConflictError";

export default class AdminCreateCategoryUseCase {

  constructor(
    private categoryRepository: CategoryRepository,
  ) { }

  async execute(id: string, category: Category) {
    const findCategoryByName = await this.categoryRepository.findByName(category.name)
    if (findCategoryByName) {
      throw new ConflictError("Category already exists")
    }
    return await this.categoryRepository.create(id, category)
  }
}