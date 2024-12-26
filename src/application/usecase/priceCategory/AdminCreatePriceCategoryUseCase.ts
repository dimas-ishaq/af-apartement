import PriceCategoryRepository from "../../../domain/repository/PriceCategoryRepository";
import PriceCategory from "../../../domain/entities/PriceCategory";
import ConflictError from "../../../domain/exceptions/ConflictError";

export default class AdminCreatePriceCategoryUseCase {

  constructor(
    private priceCategoryRepository: PriceCategoryRepository
  ) { }

  async execute(id: string, priceCategory: PriceCategory): Promise<PriceCategory> {
    const findPriceCategoryByName = await this.priceCategoryRepository.findByName(priceCategory.name)
    if (findPriceCategoryByName) {
      throw new ConflictError("PriceCategory already exists")
    }
    return await this.priceCategoryRepository.create(id, priceCategory)

  }
}