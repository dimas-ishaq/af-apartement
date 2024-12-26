import PriceRepository from "../../../domain/repository/PriceRepository";
import Price from "../../../domain/entities/Price";
import NotFoundError from "../../../domain/exceptions/NotFoundError";

export default class AdminUpdatePriceUseCase {
  constructor(
    private priceRepository: PriceRepository
  ) { }

  async execute(id: string, name?: string, price?: number): Promise<Price> {
    const findPriceById = await this.priceRepository.findById(id)
    if (!findPriceById) {
      throw new NotFoundError("Price not found")
    }
    return await this.priceRepository.update(id, name, price)
  }

}