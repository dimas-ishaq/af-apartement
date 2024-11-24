
import Admin from "../entities/Admin";

export default interface AdminRepository {
  create(admin: Admin): Promise<Admin>
  update(admin: Admin): Promise<Admin>
  delete(id: string): Promise<void>
}