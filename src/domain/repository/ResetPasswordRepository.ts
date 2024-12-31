
import ResetPassword from "../entities/ResetPassword";
export default interface ResetPasswordRepository {
  create(resetPassword: ResetPassword): Promise<void>
  findByEmail(email: string): Promise<ResetPassword | null>
  update(email: string, isPinValid: boolean): Promise<void>;
  delete(email: string): Promise<void>;
}