'use client'

import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

interface NewsArticleFormProps {
  author: string
}

const NewsArticleForm: React.FC<NewsArticleFormProps> = ({ author }) => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [originLink, setOriginLink] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newArticle = {
      title,
      text,
      originLink,
      author,
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="text">
        <Form.Label>Text</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="originLink">
        <Form.Label>Origin Link</Form.Label>
        <Form.Control
          type="text"
          value={originLink}
          onChange={(e) => setOriginLink(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add Article
      </Button>
    </Form>
  )
}

export { NewsArticleForm }
