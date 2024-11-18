'use client'

import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { gql, useQuery, useMutation } from '@apollo/client'

import { AuthPanel, NewsArticleForm } from '@/components'

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
      created_at
      updated_at
    }
  }
`

const UPDATE_NEWS_ARTICLE = gql`
  mutation UpdateNewsArticle($id: Int!, $article: NewsArticleInput) {
    updateNewsArticle(id: $id, article: $article) {
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
  const [updateNewsArticle] = useMutation(UPDATE_NEWS_ARTICLE, {
    refetchQueries: [{ query: GET_NEWS_ARTICLES }],
  })

  const handleSubmitCreate = (article) => {
    createNewsArticle({ variables: { article } })
  }

  const handleSubmitUpdate = (article) => {
    const updatingArticle = { ...article }
    delete updatingArticle.id
    updateNewsArticle({
      variables: { id: article.id, article: updatingArticle },
    })
  }

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
            <h3>Добавить</h3>
            <NewsArticleForm onSubmit={handleSubmitCreate} />
          </section>

          <section>
            <h3>Редактировать</h3>
            {data?.newsArticles?.map((article) => (
              <NewsArticleForm
                key={article.id}
                onSubmit={handleSubmitUpdate}
                {...article}
              />
            ))}
          </section>
        </Col>
      </Row>
    </Container>
  )
}

export default AdminNewsPage
