import PriceRepository from "../../../domain/repository/PriceRepository";
import Price from "../../../domain/entities/Price";

export default class AdminFindAllPriceUseCase {
  constructor(
    private priceRepository: PriceRepository
  ) { }
  async execute(): Promise<Price[] | null> {
    return await this.priceRepository.findAll()
  }
}