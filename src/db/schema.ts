import { pgTable, serial, text, varchar, timestamp } from 'drizzle-orm/pg-core'

export const newsArticle = pgTable('news_articles', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  author: varchar('author', { length: 255 }).notNull(),
  text: text('text').notNull(),
  date: timestamp('date').notNull(),
  originUrl: varchar('origin_url', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
