
import BadRequestError from "../../../../domain/exceptions/BadRequestError";
import TokenManager, { Payload } from "../../../../infrastructure/service/TokenManager";

export default class ReqNewAccessTokenUseCase {
  constructor(private tokenManager: TokenManager) { }

  async execute(refreshToken: string) {
    try {
      const payload = this.tokenManager.verifyRefreshToken(refreshToken) as Payload
      const newPayload = {
        id: payload.id,
        email: payload.email
      }
      return this.tokenManager.generateAccessToken(newPayload)
    } catch (error: any) {
      throw new BadRequestError(error.message)
    }
  }
}