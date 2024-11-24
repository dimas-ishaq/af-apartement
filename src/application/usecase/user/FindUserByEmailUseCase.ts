import UserRepository from "../../../domain/repository/UserRepository";



export default class FindUserByEmailUseCase {
  constructor(private userRepository: UserRepository) { }
  
}