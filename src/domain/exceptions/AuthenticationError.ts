import CustomError from "./CustomError";

export default class AuthenticationError extends CustomError {
  constructor(message: string) {
    super(message, 401);
  }
}