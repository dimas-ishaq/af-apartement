import UnitImage from "../entities/UnitImage";

export default interface UnitImageRepository {
  create(id: string, unitImage: UnitImage): Promise<UnitImage>;
  update(id: string, id_unit?: string, image?: string): Promise<UnitImage>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<UnitImage | null>;
  findByUnitId(id_unit: string): Promise<UnitImage[] | null>;
}