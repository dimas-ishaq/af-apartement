import Unit from "../entities/Unit"
export default interface UnitRepository {
    create(id: string, unit: Unit): Promise<Unit>;
    update(id: string, unit: Unit): Promise<Unit>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<Unit | null>;
    findByBuildingId(id_building: string): Promise<Unit[] | null>;
    findAll(): Promise<Unit[] | null>;
}