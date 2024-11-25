'use client'

import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import { gql, useQuery, useMutation } from '@apollo/client'

import { AuthPanel, RoleForm } from '@/components'
import { cleanVariables } from '@/utils/cleanVariables'
// import { Button } from 'react-bootstrap'

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
  const [createRole] = useMutation(CREATE_ROLE, {
    refetchQueries: [{ query: GET_ROLES }],
  })
  const [updateRole] = useMutation(UPDATE_ROLE, {
    refetchQueries: [{ query: GET_ROLES }],
  })

  const { data: usersData } = useQuery(GET_USERS)

  const [updateUserRole] = useMutation(UPDATE_USER_ROLE, {
    refetchQueries: [{ query: GET_USERS }, { query: GET_ROLES }],
  })

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

  const handleUserRoleChange = (userId, roleId) => {
    updateUserRole({ variables: { userId, roleId } })
  }

  // const handleRoleDelete = (role) => {
  //   // todo
  // }

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
            <Accordion>
              {rolesData?.roles?.map((role) => (
                <Accordion.Item eventKey={role.id} key={role.id}>
                  <Accordion.Header>{role.name}</Accordion.Header>
                  <Accordion.Body>
                    <RoleForm onSubmit={handleRoleUpdate} {...role} />
                    {/* <Button
                      variant="danger"
                      onClick={() => handleRoleDelete(role)}
                    >
                      Delete
                    </Button> */}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </section>
        </Col>
      </Row>
    </Container>
  )
}

export default AdminPage
