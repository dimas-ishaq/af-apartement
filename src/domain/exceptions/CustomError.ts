export default class CustomError extends Error {
  public statusCode: number;
  public name: string;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode
    this.name = this.constructor.name;
  }
}