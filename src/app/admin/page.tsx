'use client'

import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { gql, useQuery, useMutation } from '@apollo/client'

import { AuthPanel, NewsArticleForm, RoleForm } from '@/components'
import { cleanVariables } from '@/utils/cleanVariables'

const CREATE_NEWS_ARTICLE = gql`
  mutation CreateNewsArticle($article: NewsArticleInput) {
    createNewsArticle(article: $article) {
      id
      title
      author
      text
      origin_url
      created_at
      updated_at
    }
  }
`

const GET_NEWS_ARTICLES = gql`
  query GetNewsArticles {
    newsArticles {
      id
      title
      author
      text
      created_at
      updated_at
    }
  }
`

const UPDATE_NEWS_ARTICLE = gql`
  mutation UpdateNewsArticle($id: Int!, $article: NewsArticleInput) {
    updateNewsArticle(id: $id, article: $article) {
      id
      title
      author
      text
      origin_url
      created_at
      updated_at
    }
  }
`

const CREATE_ROLE = gql`
  mutation CreateRole($role: RoleInput) {
    createRole(role: $role) {
      id
      name
      permissions {
        resource
        actions
      }
    }
  }
`

const GET_ROLES = gql`
  query GetRoles {
    roles {
      id
      name
      permissions {
        resource
        actions
      }
    }
  }
`

const UPDATE_ROLE = gql`
  mutation UpdateRole($id: String!, $role: RoleInput) {
    updateRole(id: $id, role: $role) {
      id
      name
      permissions {
        resource
        actions
      }
    }
  }
`

const AdminPage: React.FC = () => {
  const { data } = useQuery(GET_NEWS_ARTICLES)
  const [createNewsArticle] = useMutation(CREATE_NEWS_ARTICLE, {
    refetchQueries: [{ query: GET_NEWS_ARTICLES }],
  })
  const [updateNewsArticle] = useMutation(UPDATE_NEWS_ARTICLE, {
    refetchQueries: [{ query: GET_NEWS_ARTICLES }],
  })

  const { data: rolesData } = useQuery(GET_ROLES)
  const [createRole] = useMutation(CREATE_ROLE, {
    refetchQueries: [{ query: GET_ROLES }],
  })
  const [updateRole] = useMutation(UPDATE_ROLE, {
    refetchQueries: [{ query: GET_ROLES }],
  })

  const handleSubmitCreate = (article) => {
    createNewsArticle({ variables: { article } })
  }

  const handleSubmitUpdate = (article) => {
    const updatingArticle = { ...article }
    delete updatingArticle.id
    updateNewsArticle({
      variables: { id: article.id, article: updatingArticle },
    })
  }

  const handleRoleCreate = (role) => {
    createRole({ variables: { role } })
  }

  const handleRoleUpdate = (role) => {
    const updatingRole = { ...role }
    delete updatingRole.id
    updateRole({
      variables: { id: role.id, role: cleanVariables(updatingRole) },
    })
  }

  return (
    <Container fluid>
      <h1>Admin Page</h1>

      <Row>
        <Col>
          <AuthPanel />
        </Col>
      </Row>
      <Row>
        <Col>
          <section>
            <h3>Добавить роль</h3>
            <RoleForm onSubmit={handleRoleCreate} />
          </section>
        </Col>
      </Row>
      <Row>
        <Col>
          <section>
            <h3>Редактировать роли</h3>
            {rolesData?.roles?.map((role) => (
              <RoleForm key={role.id} onSubmit={handleRoleUpdate} {...role} />
            ))}
          </section>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Редактировать новости</h2>
          <section>
            <h3>Добавить</h3>
            <NewsArticleForm onSubmit={handleSubmitCreate} />
          </section>

          <section>
            <h3>Редактировать</h3>
            {data?.newsArticles?.map((article) => (
              <NewsArticleForm
                key={article.id}
                onSubmit={handleSubmitUpdate}
                {...article}
              />
            ))}
          </section>
        </Col>
      </Row>
    </Container>
  )
}

export default AdminPage
