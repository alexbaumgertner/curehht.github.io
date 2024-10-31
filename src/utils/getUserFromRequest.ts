import { NextRequest } from 'next/server'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import { eq } from 'drizzle-orm'

import { sessions, users } from '@/db/schema'

import { getSessionTokenName } from './getSessionTokenName'

export const getUserFromRequest = async (req: NextRequest) => {
  const db = drizzle()
  const sessionTokenName = getSessionTokenName()
  const sessionId = req.cookies?.get(sessionTokenName)?.value

  if (!sessionId) return null

  const currentUser = await db
    .select()
    .from(users)
    .innerJoin(sessions, eq(sessions.userId, users.id))
    .where(eq(sessions.sessionToken, sessionId))
    .limit(1)

  return currentUser[0]?.user
}
