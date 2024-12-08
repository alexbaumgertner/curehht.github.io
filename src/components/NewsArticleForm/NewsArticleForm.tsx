'use client'

import React from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

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

  return (
    <article>
      <Form.Group as={Row} className="mb-3" controlId="title">
        <Form.Label column sm={2}>
          Название
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            name="title"
            value={article.title || ''}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="summary">
        <Form.Label column sm={2}>
          Текст
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            as="textarea"
            name="summary"
            rows={10}
            value={article.summary || ''}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="origin_url">
        <Form.Label column sm={2}>
          Ссылка на новость
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            name="origin_url"
            value={article.origin_url || ''}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 2 }}>
          <Button
            variant="primary"
            style={{ margin: '1em 0 0 0' }}
            onClick={handleSubmit}
          >
            {id ? 'Сохранить' : 'Создать'}
          </Button>
        </Col>
      </Form.Group>
    </article>
  )
}

export { NewsArticleForm }
