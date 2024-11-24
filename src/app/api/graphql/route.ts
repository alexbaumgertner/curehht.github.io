import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import { gql } from 'graphql-tag'
import { NextRequest } from 'next/server'

import { newsArticle, roles, users } from '@/db/schema'
import { getUserFromRequest } from '@/utils/getUserFromRequest'

const typeDefs = gql`
  scalar Date
  scalar JSON

  type NewsArticle {
    id: Int!
    title: String!
    author: String!
    text: JSON
    origin_url: String
    updated_at: Date
    created_at: Date!
    deleted_at: Date
  }

  input NewsArticleInput {
    title: String!
    text: JSON
    origin_url: String
  }

  type Role {
    id: String!
    name: String!
    permissions: [Permission]
  }

  input RoleInput {
    name: String
    permissions: [PermissionInput]
  }

  type Permission {
    actions: [Action]
    resource: ResourceName!
  }

  input PermissionInput {
    actions: [Action]
    resource: ResourceName
  }

  enum Action {
    create
    read
    update
    delete
  }

  enum ResourceName {
    articles
    newsArticle
  }

  type User {
    id: String!
    name: String
    email: String
    role_id: String
  }

  type Query {
    newsArticles: [NewsArticle]
    newsArticle(id: Int!): NewsArticle

    roles: [Role]

    users: [User]
  }

  type Mutation {
    createNewsArticle(article: NewsArticleInput): NewsArticle
    updateNewsArticle(id: Int!, article: NewsArticleInput): NewsArticle
    deleteNewsArticle(id: Int!): NewsArticle

    createRole(role: RoleInput): Role
    updateRole(id: String!, role: RoleInput): Role
    deleteRole(id: String!): Role

    updateUserRole(userId: String!, roleId: String!): User
  }
`

const resolvers = {
  Query: {
    newsArticles: async (_parent: unknown, _args, { db }) => {
      const result = await db.select().from(newsArticle)
      return result
    },
    newsArticle: async (_parent: unknown, { id }, { db }) => {
      const result = await db
        .select()
        .from(newsArticle)
        .where(eq(newsArticle.id, id))
      return result[0]
    },

    roles: async (_parent: unknown, _args, { db }) => {
      const result = await db.select().from(roles)
      return result
    },

    users: async (_parent: unknown, _args, { db }) => {
      const result = await db.select().from(users)
      return result
    },
  },
  Mutation: {
    createNewsArticle: async (_parent: unknown, { article }, { db, user }) => {
      const result = await db
        .insert(newsArticle)
        .values({
          ...article,
          author: user.id,
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

    createRole: async (_parent: unknown, { role }, { db, user }) => {
      const result = await db
        .insert(roles)
        .values({ ...role, owner_id: user.id })
        .returning()
      return result[0]
    },
    updateRole: async (_parent: unknown, { id, role }, { db }) => {
      const result = await db
        .update(roles)
        .set(role)
        .where(eq(roles.id, id))
        .returning()
      return result[0]
    },

    updateUserRole: async (_parent: unknown, { userId, roleId }, { db }) => {
      const result = await db
        .update(users)
        .set({ role_id: roleId })
        .where(eq(users.id, userId))
        .returning()
      return result[0]
    },
  },
}

const server = new ApolloServer<object>({
  resolvers,
  typeDefs,
  introspection: true,
})

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => {
    const user = await getUserFromRequest(req)
    const db = drizzle()

    console.log('user: ', user)

    return {
      db,
      user,
    }
  },
})

export { handler as GET, handler as POST }
