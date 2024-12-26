import Category from "../entities/Category"

export default interface CategoryRepository {
  create(id: string, category: Category): Promise<Category>
  findByName(name: string): Promise<Category | null>
  findById(id: string): Promise<Category | null>
  findAll(): Promise<Category[] | null>
  update(id: string, name?: string, image?: string): Promise<Category>
  delete(id: string): Promise<void>

}