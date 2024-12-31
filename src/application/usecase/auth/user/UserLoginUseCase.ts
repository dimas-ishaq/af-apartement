
import UserRepository from "../../../../domain/repository/UserRepository";
import PasswordHash from "../../../../infrastructure/service/PasswordHash";
import AuthenticationError from "../../../../domain/exceptions/AuthenticationError";
import NotFoundError from "../../../../domain/exceptions/NotFoundError";
import TokenManager from "../../../../infrastructure/service/TokenManager";
import SessionRepository from "../../../../domain/repository/SessionRepository";
import BadRequestError from "../../../../domain/exceptions/BadRequestError";
import { Role } from "../../../../domain/entities/Session";

interface UserLogin {
  email: string;
  password: string;
}

export default class UserLoginUseCase {
  constructor(
    private userRepository: UserRepository,
    private sessionRepository: SessionRepository,
    private passwordHash: PasswordHash,
    private tokenManager: TokenManager
  ) { }

  async execute(user: UserLogin) {
    const { email, password } = user;
    const findUserByEmail = await this.userRepository.findByEmail(email);

    if (!findUserByEmail) {
      throw new NotFoundError("User not found");
    }

    if (findUserByEmail.isConfirmed === false) {
      throw new BadRequestError("User not confirmed");
    }

    const comparedPassword = await this.passwordHash.compare(password, findUserByEmail.password);

    if (!comparedPassword) {
      throw new AuthenticationError('Invalid email or password')
    }
    if (findUserByEmail.id) {

      const payload = {
        id: findUserByEmail.id,
        email
      }
      const { accessToken, refreshToken } = this.tokenManager.generateToken(payload);
      if (accessToken && refreshToken) {
        try {
          await this.sessionRepository.create({ user_id: findUserByEmail.id, refresh_token: refreshToken, type: Role.User })
          return {
            accessToken,
            refreshToken
          }
        } catch (error: any) {
          throw new Error(error.message)
        }
      }
    }
  }
}