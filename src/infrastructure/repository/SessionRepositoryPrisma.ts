import Session from "../../domain/entities/Session";
import SessionRepository from "../../domain/repository/SessionRepository";
import { prisma } from "../database/prisma";


export default class SessionRepositoryPrisma implements SessionRepository {
  async create(session: Session): Promise<void> {
    const { user_id, refresh_token, type } = session;
    await prisma.session.upsert({
      where: { user_id: user_id },
      update: { refresh_token: refresh_token },
      create: {
        user_id: user_id,
        type: type,
        refresh_token: refresh_token
      },
    })
  }

  async findByToken(token: string): Promise<Session | null> {
    return await prisma.session.findFirst({ where: { refresh_token: token } });
  }
  async findByUserId(user_id: string): Promise<Session | null> {
    return await prisma.session.findUnique({ where: { user_id: user_id } })
  }

  async delete(id: string): Promise<void> {
    await prisma.session.delete({
      where: { user_id: id }
    })
  }
}