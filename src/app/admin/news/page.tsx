'use client'

import React from 'react'
import Link from 'next/link'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { gql, useQuery, useMutation } from '@apollo/client'

import { NewsArticleForm } from '@/components'
import { ListGroup } from 'react-bootstrap'

const CREATE_NEWS_ARTICLE = gql`
  mutation CreateNewsArticle($article: NewsArticleInput) {
    createNewsArticle(article: $article) {
      id
      title
      author
      text
      origin_url
      created_at
      updated_at
    }
  }
`

const GET_NEWS_ARTICLES = gql`
  query GetNewsArticles {
    newsArticles {
      id
      title
      author
      text
      origin_url
      created_at
      updated_at
    }
  }
`

const AdminNewsPage: React.FC = () => {
  const { data } = useQuery(GET_NEWS_ARTICLES)
  const [createNewsArticle] = useMutation(CREATE_NEWS_ARTICLE, {
    refetchQueries: [{ query: GET_NEWS_ARTICLES }],
  })

  const handleSubmitCreate = (article) => {
    createNewsArticle({ variables: { article } })
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <section>
            <h3>Добавить</h3>
            <NewsArticleForm onSubmit={handleSubmitCreate} />
          </section>

          <section>
            <h3>Редактировать</h3>
            <ListGroup>
              {data?.newsArticles?.map((article) => (
                <ListGroup.Item key={article.id}>
                  <Link href={`/admin/news/${article.id}`}>
                    {article.title}
                  </Link>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </section>
        </Col>
      </Row>
    </Container>
  )
}

export default AdminNewsPage
