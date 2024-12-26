import PriceCategoryRepository from "../../../domain/repository/PriceCategoryRepository";
import PriceCategory from "../../../domain/entities/PriceCategory";
import NotFoundError from "../../../domain/exceptions/NotFoundError";


export default class AdminUpdatePriceCategoryUseCase {
  constructor(
    private priceCategoryRepository: PriceCategoryRepository
  ) { }

  async execute(id: string, name: string): Promise<PriceCategory> {
    const findPriceCategory = await this.priceCategoryRepository.findById(id)
    if (!findPriceCategory) {
      throw new NotFoundError("PriceCategory not found")
    }
    return await this.priceCategoryRepository.update(id, name)
  }
}