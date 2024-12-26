import NotFoundError from "../../../../domain/exceptions/NotFoundError";
import SessionRepository from "../../../../domain/repository/SessionRepository";

export default class UserLogoutUseCase {
  constructor(private sessionRepository: SessionRepository) { }
  async execute(id: string) {
    const session = await this.sessionRepository.findByUserId(id)
    if (!session) {
      throw new NotFoundError("User not found")
    }
    return await this.sessionRepository.delete(id)
  }
}