
import UserRepository from "../../../../domain/repository/UserRepository";

export default class UpdateConfirmationEmailUseCase {
  constructor(private userRepository: UserRepository) { }

  async execute(userId: string) {
    const isUserExist = await this.userRepository.findById(userId);
    if (!isUserExist) {
      throw new Error('User not found')
    }
    const isConfirmed = true;
    await this.userRepository.updateUserStatus(userId, isConfirmed);
  }
}