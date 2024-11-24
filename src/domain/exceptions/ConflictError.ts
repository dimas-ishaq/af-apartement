import CustomError from "./CustomError";

export default class ConflictError extends CustomError {
  constructor(message: string) {
    super(message, 409);
  }
}