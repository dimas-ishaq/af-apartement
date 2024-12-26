

import User from "../entities/User";

export default interface UserRepository {
  create(id: string, user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(id: string, user: User): Promise<User>;
  updateUserStatus(id: string, isConfirmed: boolean): Promise<void>;
  updatePasswordByEmail(email: string, password: string): Promise<void>;
  delete(id: string): Promise<void>;
}