import PriceRepository from "../../../domain/repository/PriceRepository";
import Price from "../../../domain/entities/Price";
import NotFoundError from "../../../domain/exceptions/NotFoundError";
import ConflictError from "../../../domain/exceptions/ConflictError";

export default class AdminUpdatePriceUseCase {
  constructor(
    private priceRepository: PriceRepository
  ) { }

  async execute(id: string, name?: string, price?: number): Promise<Price> {
    const findPriceById = await this.priceRepository.findById(id)
    if (!findPriceById) {
      throw new NotFoundError("Price not found")
    }
    if(name){
      const findPriceByName = await this.priceRepository.findByName(name)
      if (findPriceByName) {
        throw new ConflictError("Price name already exists")
      }
    }
    return await this.priceRepository.update(id, name, price)
  }

}