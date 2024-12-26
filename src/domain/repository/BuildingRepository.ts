import Building from "../entities/Building"


export default interface BuildingRepository {
  create(id: string, building: Building): Promise<Building>
  update(id: string, name?: string, id_category?: string): Promise<Building>
  delete(id: string): Promise<void>
  findAll(): Promise<Building[] | null>
  findById(id: string): Promise<Building | null>
  findByName(name: string): Promise<Building | null>
  findByCategoryId(id_category: string): Promise<Building[] | null>
}