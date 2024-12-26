
import AdminRepository from "../../../../domain/repository/AdminRepository"
import SessionRepository from "../../../../domain/repository/SessionRepository";
import PasswordHash from "../../../../infrastructure/service/PasswordHash";
import TokenManager from "../../../../infrastructure/service/TokenManager";
import NotFoundError from "../../../../domain/exceptions/NotFoundError";
import AuthenticationError from "../../../../domain/exceptions/AuthenticationError";

interface AdminLogin {
  email: string;
  password: string
}
export default class AdminLoginUseCase {
  constructor(
    private adminRepository: AdminRepository,
    private sessionRepository: SessionRepository,
    private passwordHash: PasswordHash,
    private tokenManager: TokenManager
  ) { }

  async execute(admin: AdminLogin) {
    const { email, password } = admin
    const findAdminByEmail = await this.adminRepository.findByEmail(email)
    if (!findAdminByEmail) {
      throw new NotFoundError("Admin not found")
    }

    const comparedPassword = await this.passwordHash.compare(password, findAdminByEmail.password);

    if (!comparedPassword) {
      throw new AuthenticationError('Invalid email or password')
    }
    if (findAdminByEmail.id) {

      const payload = {
        id: findAdminByEmail.id,
        email,
        role: "Admin"
      }
      const { accessToken, refreshToken } = this.tokenManager.generateToken(payload);
      if (accessToken && refreshToken) {
        try {
          await this.sessionRepository.create({ user_id: findAdminByEmail.id, refresh_token: refreshToken, })
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