import SessionRepository from "../../../../domain/repository/SessionRepository";
import NotFoundError from "../../../../domain/exceptions/NotFoundError";

export default class AdminLogoutUseCase {
  constructor(
    private sessionRepository: SessionRepository,
  ) { }

  async execute(id: string) {
    const session = await this.sessionRepository.findByUserId(id)
    if (!session) {
      throw new NotFoundError("Admin not found")
    }
    return await this.sessionRepository.delete(id)
  }
}
