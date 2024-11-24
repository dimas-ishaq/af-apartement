import bcrypt from "bcrypt";

export default class PasswordHash {
  hash(password: string) {
    return bcrypt.hash(password, 10)
  }

  compare(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword)
  }
}