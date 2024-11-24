
import Session from "../entities/Session"
export default interface SessionRepository {
  create(session: Session): Promise<void>
  delete(id: string): Promise<void>
}