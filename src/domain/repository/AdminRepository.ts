
import Admin from "../entities/Admin";

export default interface AdminRepository {
  create(id: string, admin: Admin): Promise<Admin>
  findById(id: string): Promise<Admin | null>;
  findByEmail(email: string): Promise<Admin | null>;
  update(admin: Admin): Promise<Admin>
  delete(id: string): Promise<void>
  updatePasswordByEmail(email: string, password: string): Promise<void>;
}