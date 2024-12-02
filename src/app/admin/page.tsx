'use client'

import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { gql, useQuery, useMutation } from '@apollo/client'

import { AuthPanel } from '@/components'

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

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      role_id
    }
  }
`

const UPDATE_USER_ROLE = gql`
  mutation UpdateUserRole($userId: String!, $roleId: String!) {
    updateUserRole(userId: $userId, roleId: $roleId) {
      id
      name
      email
      role_id
    }
  }
`

const AdminPage: React.FC = () => {
  const { data: rolesData } = useQuery(GET_ROLES)
  const { data: usersData } = useQuery(GET_USERS)

  const [updateUserRole] = useMutation(UPDATE_USER_ROLE, {
    refetchQueries: [{ query: GET_USERS }, { query: GET_ROLES }],
  })

  const handleUserRoleChange = (userId, roleId) => {
    updateUserRole({ variables: { userId, roleId } })
  }

  return (
    <Container fluid>
      <h1>Admin Page</h1>

      <Row>
        <Col align="right">
          <AuthPanel />
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Присвоить роль пользователю</h3>
          <ul>
            {usersData?.users?.map((user) => (
              <li key={user.id}>
                {user.name} ({user.email})
                <ol>
                  {rolesData?.roles?.map((role) => (
                    <li key={role.id}>
                      <label>
                        <input
                          type="radio"
                          name={`user-${user.id}-role`}
                          value={role.id}
                          checked={user.role_id === role.id}
                          onChange={() =>
                            handleUserRoleChange(user.id, role.id)
                          }
                        />{' '}
                        {role.name}
                      </label>
                    </li>
                  ))}
                </ol>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  )
}

export default AdminPage
