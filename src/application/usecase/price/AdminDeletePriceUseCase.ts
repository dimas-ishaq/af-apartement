import PriceRepository from "../../../domain/repository/PriceRepository";
import NotFoundError from "../../../domain/exceptions/NotFoundError";

export default class AdminDeletePriceUseCase {
  constructor(
    private priceRepository: PriceRepository
  ) { }

  async execute(id: string): Promise<void> {
    const findPriceById = await this.priceRepository.findById(id)
    if (findPriceById) {
      throw new NotFoundError("Price not found")
    }
    await this.priceRepository.delete(id)
  }
}