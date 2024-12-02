'use client'

import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

// import { Editor } from '@/components'

interface NewsArticleFormProps {
  id?: number
  title?: string
  summary?: string
  text?: []
  origin_url?: string
  onSubmit?: (article) => void
}

const NewsArticleForm: React.FC<NewsArticleFormProps> = ({
  id,
  title,
  summary,
  text,
  origin_url,
  onSubmit,
}) => {
  const [article, setArticle] = React.useState({
    title,
    summary,
    text: text,
    origin_url,
  })

  const handleSubmit = () => {
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

  // const handleEditorChange = (value) => {
  //   console.log('value: ', value)
  //   setArticle((prev) => ({
  //     ...prev,
  //     text: value,
  //   }))
  // }

  return (
    <div>
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={article.title || ''}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="summary">
        <Form.Label>Summary</Form.Label>
        <Form.Control
          as="textarea"
          name="summary"
          value={article.summary || ''}
          onChange={handleChange}
        />
      </Form.Group>
      {/* <Editor value={text} onChange={handleEditorChange} /> */}
      <Form.Group controlId="origin_url">
        <Form.Label>Origin Link</Form.Label>
        <Form.Control
          type="text"
          name="origin_url"
          value={article.origin_url || ''}
          onChange={handleChange}
        />
      </Form.Group>
      <Button
        variant="primary"
        style={{ margin: '1em 0 0 0' }}
        onClick={handleSubmit}
      >
        {id ? 'Update' : 'Create'} Article
      </Button>
    </div>
  )
}

export { NewsArticleForm }
