'use client'

import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import gql from 'graphql-tag'

interface NewsArticleFormProps {
  title?: string
  text?: string
  origin_link?: string
}

const NewsArticleForm: React.FC<NewsArticleFormProps> = ({
  title,
  text,
  origin_link,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle the form data as needed
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" value={title} />
      </Form.Group>
      <Form.Group controlId="text">
        <Form.Label>Text</Form.Label>
        <Form.Control as="textarea" rows={3} value={text} />
      </Form.Group>
      <Form.Group controlId="originLink">
        <Form.Label>Origin Link</Form.Label>
        <Form.Control type="text" value={origin_link} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add Article
      </Button>
    </Form>
  )
}

export { NewsArticleForm }
