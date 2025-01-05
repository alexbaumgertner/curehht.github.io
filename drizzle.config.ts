import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

import dotenv from 'dotenv'

dotenv.config({
  path: '.env.local',
})

export default defineConfig({
  out: './drizzle',
  schema: ['./src/db/schema.ts', './src/db/schemas/auth.ts'],
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
})
