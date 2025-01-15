import Unit from "../entities/Unit";
export default interface UnitRepository {
  create(id: string, unit: Unit): Promise<Unit>;
  update(
    id: string,
    buildingId?: string,
    name?: string,
    status?: string
  ): Promise<Unit>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Unit | null>;
  findByName(name: string): Promise<Unit | null>;
  findByBuildingId(buildingId: string): Promise<Unit[] | null>;
  findAll(): Promise<Unit[] | null>;
}
