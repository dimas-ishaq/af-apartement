
import CategoryRepository from "../../../domain/repository/CategoryRepository";
import Category from "../../../domain/entities/Category";


export default class AdminFindAllCategoryUseCase {
  constructor(
    private categoryRepository: CategoryRepository
  ) { }

  async execute(): Promise<Category[] | null> {
    return await this.categoryRepository.findAll()
  }
}