import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

import { TiptapEditor } from '../TiptapEditor/TiptapEditor'

export type PageProps = {
  id?: string
  title: string
  slug: string
  slug_name: string
  summary: string
  content: string
}

export const PageForm = ({
  page,
  onSubmit,
}: {
  page: PageProps
  onSubmit: (page: PageProps) => void
}) => {
  const [formPage, setFormPage] = useState(page)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormPage({ ...formPage, [name]: value })
  }

  const handleContentChange = (content: string) => {
    setFormPage({ ...formPage, content })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(formPage)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formPage.title}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Slug</Form.Label>
        <Form.Control
          type="text"
          name="slug"
          value={formPage.slug}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Slug Name</Form.Label>
        <Form.Control
          type="text"
          name="slug_name"
          value={formPage.slug_name}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Summary</Form.Label>
        <Form.Control
          type="text"
          name="summary"
          value={formPage.summary}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Content</Form.Label>
        <TiptapEditor
          content={formPage.content}
          onChange={handleContentChange}
        />
      </Form.Group>

      <Button type="submit">Save</Button>
    </Form>
  )
}
