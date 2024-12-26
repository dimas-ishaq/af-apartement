import PriceRepository from "../../../domain/repository/PriceRepository";
import Price from "../../../domain/entities/Price";
import BadRequestError from "../../../domain/exceptions/BadRequestError";

export default class AdminCreatePriceUseCase {
  constructor(
    private priceRepository: PriceRepository
  ) { }

  async execute(id:string, price: Price): Promise<Price> {
    const findPriceByName = await this.priceRepository.findByName(price.name)
    if (findPriceByName) {
      throw new BadRequestError("Price name already exists")
    }

    return await this.priceRepository.create(id,price)
  }
}