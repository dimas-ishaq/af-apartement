
import Category from "../../../domain/entities/Category";
import CategoryRepository from "../../../domain/repository/CategoryRepository";
import NotFoundError from "../../../domain/exceptions/NotFoundError";
import ConflictError from "../../../domain/exceptions/ConflictError";

export default class AdminUpdateCategoryUseCase {

  constructor(private categoryRepository: CategoryRepository) { }

  async execute(id: string, name?: string, image?: string): Promise<Category> {
    const findCategoryById = await this.categoryRepository.findById(id)
    if (!findCategoryById) {
      throw new NotFoundError("Category not found")
    }
    if(name){
      const findCategoryByName = await this.categoryRepository.findByName(name)
      if (findCategoryByName) {
        throw new ConflictError("Category name already exists")
      }
    }
    return await this.categoryRepository.update(id, name, image)
  }
}