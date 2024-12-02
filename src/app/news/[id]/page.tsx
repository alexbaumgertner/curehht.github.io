'use client'

import React from 'react'
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { gql, useQuery } from '@apollo/client'

import { Editor } from '@/components'

const GET_NEWS_ARTICLE = gql`
  query GetNewsArticle($id: Int!) {
    newsArticle(id: $id) {
      id
      title
      author
      summary
      text
      origin_url
      created_at
      updated_at
    }
  }
`

type NewsArticlePageProps = {
  params: {
    id: string
  }
}

const NewsArticlePage = ({ params: { id } }: NewsArticlePageProps) => {
  const { data, loading, error } = useQuery(GET_NEWS_ARTICLE, {
    variables: { id: parseInt(id, 10) },
  })

  if (loading) return <Spinner animation="border" />
  if (error) return <p>Error: {error.message}</p>

  const { title, author, summary, text, origin_url, created_at, updated_at } =
    data?.newsArticle

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>{title}</h1>
          <p>By {author}</p>
          <div>
            <Editor value={text} readOnly />
          </div>
          {origin_url && (
            <p>
              Source: <a href={origin_url}>{origin_url}</a>
            </p>
          )}
          <div>{summary && <p>{summary}</p>}</div>
          <p>Created at: {new Date(created_at).toLocaleString()}</p>
          {updated_at && (
            <p>Updated at: {new Date(updated_at).toLocaleString()}</p>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default NewsArticlePage
