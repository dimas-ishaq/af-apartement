
import UnitImageRepository from "../../../domain/repository/UnitImageRepository";
import NotFoundError from "../../../domain/exceptions/NotFoundError";
import UnitImage from "../../../domain/entities/UnitImage";

export default class AdminFindUnitImageByIdUnitUseCase {
  constructor(
    private unitImageRepository: UnitImageRepository
  ) { }
  async execute(unitId: string): Promise<UnitImage[] | null> {
    const findUnitImageByUnitId = await this.unitImageRepository.findByUnitId(unitId);
    if (!findUnitImageByUnitId) {
      throw new NotFoundError('UnitImage not found');
    }
    return findUnitImageByUnitId
  }
}
