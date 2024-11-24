

import User from "../entities/User";

export default interface UserRepository {
  create(user: User): Promise<User>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  update(user: User): Promise<User>;
  updateUserStatus(id: string, isConfirmed: boolean): Promise<void>;
  updatePassword(email: string, password: string): Promise<void>;
  delete(id: string): Promise<void>;
}