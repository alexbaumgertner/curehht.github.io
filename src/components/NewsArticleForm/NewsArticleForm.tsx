'use client'

import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

interface NewsArticleFormProps {
  id?: number
  title?: string
  text?: string
  origin_url?: string
  onSubmit?: (article: any) => void
}

const NewsArticleForm: React.FC<NewsArticleFormProps> = ({
  id,
  title,
  text,
  origin_url,
  onSubmit,
}) => {
  const [article, setArticle] = React.useState({
    title,
    text,
    origin_url,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const article = {
      id,
      title: formData.get('title') as string,
      text: formData.get('text') as string,
      origin_url: formData.get('origin_url') as string,
    }

    if (onSubmit) {
      onSubmit(article)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setArticle((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={article.title}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="text">
        <Form.Label>Text</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="text"
          value={article.text}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="origin_url">
        <Form.Label>Origin Link</Form.Label>
        <Form.Control
          type="text"
          name="origin_url"
          value={article.origin_url}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        {id ? 'Update' : 'Create'} Article
      </Button>
    </Form>
  )
}

export { NewsArticleForm }
