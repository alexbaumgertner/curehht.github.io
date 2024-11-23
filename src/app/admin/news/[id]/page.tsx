'use client'

import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { gql, useQuery, useMutation } from '@apollo/client'

import { NewsArticleForm } from '@/components'

const GET_NEWS_ARTICLE = gql`
  query GetNewsArticle($id: Int!) {
    newsArticle(id: $id) {
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

type EditNewsArticlePageProps = {
  params: {
    id: string
  }
}

const EditNewsArticlePage = ({ params: { id } }: EditNewsArticlePageProps) => {
  const { data, loading, error } = useQuery(GET_NEWS_ARTICLE, {
    variables: { id: parseInt(id, 10) },
  })

  console.log('EditNewsArticlePage')
  console.log({ data, loading, error, id })

  const [updateNewsArticle] = useMutation(UPDATE_NEWS_ARTICLE, {
    refetchQueries: [
      {
        query: GET_NEWS_ARTICLE,
        variables: { id: parseInt(id as string, 10) },
      },
    ],
  })

  const handleSubmit = (article) => {
    console.log('article: ', article)
    const updatingArticle = { ...article }
    delete updatingArticle.id
    updateNewsArticle({
      variables: { id: parseInt(id, 10), article: updatingArticle },
    })
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <Container fluid>
      <h1>Edit News Article</h1>
      <Row>
        <Col>
          <section>
            <h3>Edit</h3>
            {data?.newsArticle && (
              <NewsArticleForm onSubmit={handleSubmit} {...data.newsArticle} />
            )}
          </section>
        </Col>
      </Row>
    </Container>
  )
}

export default EditNewsArticlePage
