import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import YandexProvider from 'next-auth/providers/yandex'
import { drizzle } from 'drizzle-orm/vercel-postgres'

const db = drizzle()

export const authCommonOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  providers: [
    YandexProvider({
      clientId: process.env.AUTH_YANDEX_ID as string,
      clientSecret: process.env.AUTH_YANDEX_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authCommonOptions)

export { handler as GET, handler as POST }
