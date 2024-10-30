import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { gql } from '@apollo/client'

import { AuthPanel, NewsArticleForm } from '@/components'
import { query } from '@/components/Apollo/ServerProvider'

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

const AdminPage: React.FC = async () => {
  const { data } = await query({ query: GET_NEWS_ARTICLES })

  return (
    <Container>
      <h1>Admin Page</h1>

      <Row>
        <Col>
          <AuthPanel />
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Редактировать новости</h2>
          <section>
            <h3>Добавить новость</h3>
            <NewsArticleForm />
          </section>

          <section>
            <h3>Редактировать новость</h3>
            {data?.newsArticles?.map((article) => (
              <NewsArticleForm key={article.id} {...(article as any)} />
            ))}
          </section>
        </Col>
      </Row>
    </Container>
  )
}

export default AdminPage
