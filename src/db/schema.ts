import { pgTable, serial, text, varchar, timestamp } from 'drizzle-orm/pg-core'

export const newsArticle = pgTable('news_articles', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  author: varchar('author', { length: 255 }).notNull(),
  text: text('text').notNull(),
  origin_url: varchar('origin_url', { length: 255 }).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdateFn(() => new Date()),
})
