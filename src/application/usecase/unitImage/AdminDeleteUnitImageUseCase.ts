import UnitImageRepository from "../../../domain/repository/UnitImageRepository";
import NotFoundError from "../../../domain/exceptions/NotFoundError";

export default class AdminDeleteUnitImageUseCase {
  constructor(
    private unitImageRepository: UnitImageRepository
  ) { }

  async execute(id: string): Promise<void> {
    const findUnitImageById = await this.unitImageRepository.findById(id);
    if (!findUnitImageById) {
      throw new NotFoundError("UnitImage not found");
    }
    await this.unitImageRepository.delete(id)
  }
}