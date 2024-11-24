import Session from "../../domain/entities/Session";
import SessionRepository from "../../domain/repository/SessionRepository";
import { prisma } from "../database/prisma";


export default class SessionRepositoryPrisma implements SessionRepository {
  async create(session: Session): Promise<void> {
    const { userId, refreshToken } = session;
    await prisma.session.upsert({
      where: { user_id: userId },
      update: { refresh_token: refreshToken },
      create: {
        user_id: userId,
        refresh_token: refreshToken
      },
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.session.delete({
      where: { user_id: id }
    })
  }
}