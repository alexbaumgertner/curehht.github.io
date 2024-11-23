'use client'

import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { Editor } from '@/components'

interface NewsArticleFormProps {
  id?: number
  title?: string
  text?: []
  origin_url?: string
  onSubmit?: (article) => void
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
    text: text?.length
      ? text
      : [
          {
            type: 'paragraph',
            children: [{ text: '' }],
          },
        ],
    origin_url,
  })

  const handleSubmit = (e: React.FormEvent) => {
    if (onSubmit) {
      onSubmit({ ...article, id })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setArticle((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleEditorChange = (value) => {
    setArticle((prev) => ({
      ...prev,
      text: value,
    }))
  }

  return (
    <div>
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
        <Editor value={article.text} onChange={handleEditorChange} />
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
      <Button variant="primary" onClick={handleSubmit}>
        {id ? 'Update' : 'Create'} Article
      </Button>
    </div>
  )
}

export { NewsArticleForm }
