'use client'

import { useState } from "react"
import { useQuery, useMutation } from "@apollo/client"
import gql from "graphql-tag"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { cleanVariables } from "@/utils/cleanVariables"

const GET_PAGE_BY_ID = gql`
  query GetPageById($id: String!) {
    pageById(id: $id) {
      id
      slug
      title
      summary
      content
    }
  }
`

const UPDATE_PAGE_BY_ID = gql`
  mutation UpdatePageById($id: String!, $page: PageInput!) {
    updatePage(id: $id, page: $page) {
      id
      slug
      title
      summary
      content
      updated_at
    }
  }
`

export default function AdminPage({ params }) {
  const { id } = params
  const { data, loading, error } = useQuery(GET_PAGE_BY_ID, {
    variables: { id },
  })
  const [updatePageById] = useMutation(UPDATE_PAGE_BY_ID, {
    refetchQueries: [{ query: GET_PAGE_BY_ID, variables: { id } }],
  })

  const handleSubmit = (page) => {
    delete page.id
    updatePageById({
      variables: { id, page: cleanVariables(page) },
    })
  }

  return (
    <div>
      <h3>Page {data?.pageById?.slug}</h3>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data?.pageById && <PageForm page={data.pageById} onSubmit={handleSubmit} />}
    </div>
  )
}

function PageForm({ page, onSubmit }) {
  const [formPage, setFormPage] = useState(page)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormPage({ ...formPage, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formPage)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" name="title" value={formPage.title} onChange={handleChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Slug</Form.Label>
        <Form.Control type="text" name="slug" value={formPage.slug} onChange={handleChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Summary</Form.Label>
        <Form.Control type="text" name="summary" value={formPage.summary} onChange={handleChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control as="textarea" rows={10} name="content" value={formPage.content} onChange={handleChange} />
      </Form.Group>

      <Button type="submit">Save</Button>
    </Form>
  )
}
