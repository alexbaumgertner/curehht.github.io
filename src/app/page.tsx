import gql from 'graphql-tag'
import { Row, Col } from 'react-bootstrap'

import { getClient } from '@/components/Apollo/ServerProvider'

const GET_NEWS_ARTICLES = gql`
  query GetNewsArticles {
    newsArticles {
      id
      title
      author
      text
      created_at
      updated_at
    }
  }
`

async function IndexPage() {
  const client = getClient()
  const { data } = await client.query({
    query: GET_NEWS_ARTICLES,
  })

  return (
    <div className="IndexPage">
      <Row>
        <Col>
          <h1>News Articles</h1>
          <ul>
            {data.newsArticles.map((article) => (
              <li key={article.id}>
                <h2>{article.title}</h2>
                <p>{article.text}</p>
                <p>Author: {article.author}</p>
                <p>Created at: {article.created_at}</p>
                <p>Updated at: {article.updated_at}</p>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </div>
  )
}

export default IndexPage
