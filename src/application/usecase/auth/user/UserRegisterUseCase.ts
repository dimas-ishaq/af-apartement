
import User from "../../../../domain/entities/User";
import UserRepository from "../../../../domain/repository/UserRepository";
import ConflictError from "../../../../domain/exceptions/ConflictError";

export default class UserRegisterUseCase {
  constructor(private userRepository: UserRepository) { }

  async execute(id: string, user: User) {
    const { email } = user;
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new ConflictError("User already exists");
    }

    return await this.userRepository.create(id, user);
  }
}