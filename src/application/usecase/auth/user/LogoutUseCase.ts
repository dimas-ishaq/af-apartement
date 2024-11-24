import SessionRepository from "../../../../domain/repository/SessionRepository";

export default class LogoutUseCase {
  constructor(private sessionRepository: SessionRepository) { }
  async execute(id: string) {
    return await this.sessionRepository.delete(id)
  }
}