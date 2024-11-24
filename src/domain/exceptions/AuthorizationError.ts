import CustomError from "./CustomError";

export default class AuthorizationError extends CustomError {
  constructor(message: string) {
    super(message, 403)
  }
}