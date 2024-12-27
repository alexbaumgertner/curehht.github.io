import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  json,
} from 'drizzle-orm/pg-core'

import { PermissionAction, Resources } from './types'

export {
  users,
  accounts,
  sessions,
  verificationTokens,
  authenticators,
} from './schemas/auth'

export const roles = pgTable('role', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').unique().notNull(),
  permissions: json('permissions')
    .notNull()
    .default([
      {
        resource: Resources.newsArticle,
        actions: [PermissionAction.create, PermissionAction.read],
      },
    ]),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdateFn(() => new Date()),
  owner_id: text('owner_id').references(() => users.id, {
    onDelete: 'set null',
  }),
})

export const newsArticle = pgTable('news_articles', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  author: varchar('author', { length: 255 }).notNull(),
  summary: text('summary'),
  text: json('text').default([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]),
  origin_url: text('origin_url').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdateFn(() => new Date()),
})
