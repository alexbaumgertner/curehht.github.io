import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import { gql } from 'graphql-tag'
import { NextRequest } from 'next/server'

import { newsArticle } from '@/db/schema'

const typeDefs = gql`
  scalar Date

  type NewsArticle {
    id: Int!
    title: String!
    author: String!
    text: String!
    origin_url: String!
    updated_at: Date
    created_at: Date!
    deleted_at: Date
  }

  type Query {
    newsArticles: [NewsArticle]
  }

  input NewsArticleInput {
    author: String!
    title: String!
    text: String
    origin_url: String
  }

  type Mutation {
    createNewsArticle(article: NewsArticleInput): NewsArticle
    updateNewsArticle(id: Int!, article: NewsArticleInput): NewsArticle
    deleteNewsArticle(id: Int!): NewsArticle
  }
`

const resolvers = {
  Query: {
    newsArticles: async (_parent: unknown, _args, { db }) => {
      const result = await db.select().from(newsArticle)
      return result
    },
  },
  Mutation: {
    createNewsArticle: async (_parent: unknown, { article }, { db }) => {
      const result = await db
        .insert(newsArticle)
        .values({
          ...article,
        })
        .returning()
      return result[0]
    },
    updateNewsArticle: async (_parent: unknown, { id, article }, { db }) => {
      const result = await db
        .update(newsArticle)
        .set(article)
        .where(eq(newsArticle.id, id))
        .returning()

      return result[0]
    },
    deleteNewsArticle: async (_parent: unknown, { id }, { db }) => {
      const result = await db
        .delete(newsArticle)
        .where(eq(newsArticle.id, id))
        .returning()
      return result[0]
    },
  },
}

const server = new ApolloServer({
  resolvers,
  typeDefs,
  introspection: true,
})

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => {
    const db = drizzle()

    return {
      db,
    }
  },
})

export { handler as GET, handler as POST }
