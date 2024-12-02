import {
  pgTable,
  serial,
  integer,
  text,
  varchar,
  timestamp,
  primaryKey,
  boolean,
  json,
} from 'drizzle-orm/pg-core'

import type { AdapterAccountType } from '@auth/core/adapters'
import { PermissionAction, Resources } from './types'

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

export const users = pgTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  email: text('email').unique(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  role_id: text('role_id').references(() => roles.id, {
    onDelete: 'set null',
  }),
})

export const accounts = pgTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
})

export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
)

export const authenticators = pgTable(
  'authenticator',
  {
    credentialID: text('credentialID').notNull().unique(),
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    providerAccountId: text('providerAccountId').notNull(),
    credentialPublicKey: text('credentialPublicKey').notNull(),
    counter: integer('counter').notNull(),
    credentialDeviceType: text('credentialDeviceType').notNull(),
    credentialBackedUp: boolean('credentialBackedUp').notNull(),
    transports: text('transports'),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
)

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
