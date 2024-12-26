
import PriceCategory from "../entities/PriceCategory"
export default interface PriceCategoryRepository {
  create(id: string, priceCategory: PriceCategory): Promise<PriceCategory>
  update(id: string, name: string): Promise<PriceCategory>
  delete(id: string): Promise<void>
  findById(id: string): Promise<PriceCategory | null>
  findAll(): Promise<PriceCategory[] | null>
  findByName(name: string): Promise<PriceCategory | null>
}