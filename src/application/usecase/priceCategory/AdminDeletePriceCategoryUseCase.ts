import PriceCategoryRepository from "../../../domain/repository/PriceCategoryRepository";
import NotFoundError from "../../../domain/exceptions/NotFoundError";

export default class AdminDeletePriceCategoryUseCase {
  constructor(
    private priceCategoryRepository: PriceCategoryRepository
  ) { }

  async execute(id: string): Promise<void> {
    const findPriceCategoryById = await this.priceCategoryRepository.findById(id)
    if (!findPriceCategoryById) {
      throw new NotFoundError("PriceCategory not found")
    }
    await this.priceCategoryRepository.delete(id)
  }
}