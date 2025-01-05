'use client'

import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'

import { PageForm, PageProps } from '@/components/PageForm'

const CREATE_PAGE = gql`
  mutation CreatePage($page: PageInput!) {
    createPage(page: $page) {
      id
    }
  }
`

const initPage: PageProps = {
  title: '',
  slug: '',
  slug_name: '',
  summary: '',
  content: '',
}

export default function AdminPagesNew() {
  const [createPage, { loading, error }] = useMutation(CREATE_PAGE)

  const handleSubmit = (page: PageProps) => {
    createPage({ variables: { page } })
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return <PageForm page={initPage} onSubmit={handleSubmit} />
}
