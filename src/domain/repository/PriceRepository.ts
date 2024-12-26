import Price from "../entities/Price";


export default interface PriceRepository {
  create(id: string, price: Price): Promise<Price>
  update(id: string, name?: string, price?: number): Promise<Price>
  delete(id: string): Promise<void>
  findAll(): Promise<Price[] | null>
  findById(id: string): Promise<Price | null>
  findByName(name: string): Promise<Price | null>
}