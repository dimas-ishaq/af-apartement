import UnitImage from "../../../domain/entities/UnitImage";
import UnitImageRepository from "../../../domain/repository/UnitImageRepository";
import NotFoundError from "../../../domain/exceptions/NotFoundError";

export default class AdminUpdateUnitImageUseCase {
  constructor(
    private unitImageRepository: UnitImageRepository
  ) { }

  async execute(id: string, id_unit?: string, image?: string): Promise<UnitImage> {
    const findUnitImageById = await this.unitImageRepository.findById(id);
    if (!findUnitImageById) {
      throw new NotFoundError('UnitImage not found');
    }
    return await this.unitImageRepository.update(id, id_unit, image);
  }
}