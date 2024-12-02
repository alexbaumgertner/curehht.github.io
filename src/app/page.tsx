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
      text
      created_at
      updated_at
    }
  }
`

function IndexPage() {
  const { data, loading, error } = useQuery(GET_NEWS_ARTICLES)

  console.log('loading: ', loading)
  console.log('error: ', error)
  console.log('data: ', data)

  return (
    <div className="IndexPage">
      <Container fluid>
        <Row>
          <Col>
            <h2>Новости</h2>
            {loading && <Spinner animation="border" />}
            <ul>
              {!loading &&
                data?.newsArticles?.map((article) => (
                  <li key={article.id}>
                    <Link href={`/news/${article.id}`}>{article.title}</Link>
                  </li>
                ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default IndexPage
