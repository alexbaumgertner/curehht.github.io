'use client'

import Link from 'next/link'
import { Container, Row, Col } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'
import { gql, useQuery } from '@apollo/client'

const GET_NEWS_ARTICLES = gql`
  query GetNewsArticles {
    newsArticles {
      id
      title
      author
      summary
      text
      created_at
      updated_at
    }
  }
`

function NewsListPage() {
  const { data, loading, error } = useQuery(GET_NEWS_ARTICLES)

  if (loading) return <Spinner animation="border" />
  if (error) return <p>Error: {error.message}</p>

  console.log('data?.newsArticles: ', data?.newsArticles)

  return (
    <Container>
      <Row>
        <Col>
          <h2>Новости</h2>
          <ul>
            {data?.newsArticles?.map((article) => (
              <li key={article.id}>
                <Link href={`/news/${article.id}`}>{article.title}</Link>
                <time dateTime={new Date(article.updated_at).toLocaleString()}>
                  {' '}
                  [
                  {new Intl.DateTimeFormat().format(
                    new Date(article.updated_at)
                  )}
                  ]
                </time>
                <p>{article.summary}</p>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  )
}

export default NewsListPage
