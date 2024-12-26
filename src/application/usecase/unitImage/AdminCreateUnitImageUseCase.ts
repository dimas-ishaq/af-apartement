
import UnitImageRepository from "../../../domain/repository/UnitImageRepository";
import UnitImage from "../../../domain/entities/UnitImage";
export default class AdminCreateUnitImageUseCase {
  constructor(
    private unitImageRepository: UnitImageRepository
  ) { }

  async execute(id: string, unitImage: UnitImage): Promise<UnitImage> {
    return await this.unitImageRepository.create(id, unitImage);
  }
}