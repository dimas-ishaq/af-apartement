
import Category from "../../../domain/entities/Category";
import CategoryRepository from "../../../domain/repository/CategoryRepository";
import NotFoundError from "../../../domain/exceptions/NotFoundError";

export default class AdminUpdateCategoryUseCase {

  constructor(private categoryRepository: CategoryRepository) { }

  async execute(id: string, name?: string, image?: string): Promise<Category> {
    const findCategoryById = await this.categoryRepository.findById(id)
    if (!findCategoryById) {
      throw new NotFoundError("Category not found")
    }
    return await this.categoryRepository.update(id, name, image)
  }
}