
import Session from "../entities/Session"
export default interface SessionRepository {
  create(session: Session): Promise<void>
  delete(id: string): Promise<void>
  findByToken(token: string): Promise<Session | null>
  findByUserId(user_id: string): Promise<Session | null>
}