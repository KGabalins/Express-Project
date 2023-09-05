import Session from "../models/session.model.js";
import db from "../config/postgres.js";

export const removeSession = async (email: string) => {
  await db.sync()

  await Session.destroy({ where: { email } });
}

export const getSessionById = async (sessionId: number) => {
  await db.sync()

  const session = await Session.findOne({ where: { sessionId } })

  return session
}

export const createSession = async (email: string) => {
  await db.sync()

  await removeSession(email)

  const session = await Session.create({ email })

  return session
}