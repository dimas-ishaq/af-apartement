import PriceCategoryRepository from "../../../domain/repository/PriceCategoryRepository";
import PriceCategory from "../../../domain/entities/PriceCategory";
import NotFoundError from "../../../domain/exceptions/NotFoundError";
import ConflictError from "../../../domain/exceptions/ConflictError";


export default class AdminUpdatePriceCategoryUseCase {
  constructor(
    private priceCategoryRepository: PriceCategoryRepository
  ) { }

  async execute(id: string, name: string): Promise<PriceCategory> {
    const findPriceCategory = await this.priceCategoryRepository.findById(id)
    if (!findPriceCategory) {
      throw new NotFoundError("PriceCategory not found")
    }
    if (name) {
      const findPriceCategoryByName = await this.priceCategoryRepository.findByName(name)
      if (findPriceCategoryByName) {
        throw new ConflictError("PriceCategory name already exists")
      }
    }
    return await this.priceCategoryRepository.update(id, name)
  }
}