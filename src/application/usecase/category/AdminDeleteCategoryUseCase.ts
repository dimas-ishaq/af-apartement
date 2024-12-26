import CategoryRepository from "../../../domain/repository/CategoryRepository";
import Category from "../../../domain/entities/Category";
import NotFoundError from "../../../domain/exceptions/NotFoundError";


export default class AdminDeleteCategoryUseCase {

  constructor(
    private categoryRepository: CategoryRepository
  ) { }

  async execute(id: string): Promise<void> {
    const findCategoryById = await this.categoryRepository.findById(id)
    if (!findCategoryById) {
      throw new NotFoundError("Category not found")
    }
    await this.categoryRepository.delete(id)
  }
}