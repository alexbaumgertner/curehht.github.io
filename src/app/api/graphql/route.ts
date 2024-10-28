import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { gql } from 'graphql-tag'
import { NextRequest } from 'next/server'

const typeDefs = gql`
  type NewsArticle {
    id: ID!
    title: String!
    author: String!
    text: String!
    date: String!
    originUrl: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    newsArticles: [NewsArticle]
  }
`

const resolvers = {
  Query: {
    newsArticles: async () => {
      return [
        {
          id: 1,
          name: 'Hello, world!',
          title: 'Hello, world!',
          author: 'John Doe',
          text: 'Hello, world!',
          date: '2021-01-01',
          originUrl: 'https://example.com',
          createdAt: '2021-01-01',
          updatedAt: '2021-01-01',
        },
      ]
    },
  },
}

const server = new ApolloServer({
  resolvers,
  typeDefs,
  introspection: true,
})

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
})

export { handler as GET, handler as POST }
