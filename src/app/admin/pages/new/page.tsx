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
  summary: '',
  content: '',
}

export default function AdminPagesNew() {
  const [createPage, { loading, error }] = useMutation(CREATE_PAGE)

  const handleSubmit = (page: PageProps) => {
    createPage({ variables: { page } })
  }

  return <PageForm page={initPage} onSubmit={handleSubmit} />
}
