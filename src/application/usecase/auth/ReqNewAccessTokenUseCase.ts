
import BadRequestError from "../../../domain/exceptions/BadRequestError";
import SessionRepository from "../../../domain/repository/SessionRepository";
import TokenManager, { Payload } from "../../../infrastructure/service/TokenManager";

export default class ReqNewAccessTokenUseCase {
  constructor(
    private tokenManager: TokenManager,
    private sessionRepository: SessionRepository
  ) { }

  async execute(refreshToken: string) {
    const findToken = await this.sessionRepository.findByToken(refreshToken)
    if (!findToken) {
      throw new BadRequestError("Invalid refresh token")
    }
    const payload = this.tokenManager.verifyRefreshToken(refreshToken) as Payload
    const newPayload = {
      id: payload.id,
      email: payload.email
    }
    return this.tokenManager.generateAccessToken(newPayload)
  }
}