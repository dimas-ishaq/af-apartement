import PriceCategoryRepository from "../../../domain/repository/PriceCategoryRepository";
import PriceCategory from "../../../domain/entities/PriceCategory";

export default class AdminFindAllPriceCategoryUseCase {
  constructor(
    private priceCategoryRepository: PriceCategoryRepository
  ) { }

  async execute(): Promise<PriceCategory[] | null> {
    return await this.priceCategoryRepository.findAll()
  }
}