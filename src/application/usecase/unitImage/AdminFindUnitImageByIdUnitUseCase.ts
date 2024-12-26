
import UnitImageRepository from "../../../domain/repository/UnitImageRepository";
import NotFoundError from "../../../domain/exceptions/NotFoundError";
import UnitImage from "../../../domain/entities/UnitImage";

export default class AdminFindUnitImageByIdUnitUseCase {
  constructor(
    private unitImageRepository: UnitImageRepository
  ) { }
  async execute(id_unit: string): Promise<UnitImage[] | null> {
    const findUnitImageByUnitId = await this.unitImageRepository.findByUnitId(id_unit);
    if (!findUnitImageByUnitId) {
      throw new NotFoundError('UnitImage not found');
    }
    return findUnitImageByUnitId
  }
}
