'use client'

import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import { gql, useQuery, useMutation } from '@apollo/client'

import { RoleForm } from '@/components'
import { cleanVariables } from '@/utils/cleanVariables'

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

const AdminRolePage: React.FC = () => {
  const { data: rolesData } = useQuery(GET_ROLES)
  const [createRole] = useMutation(CREATE_ROLE, {
    refetchQueries: [{ query: GET_ROLES }],
  })
  const [updateRole] = useMutation(UPDATE_ROLE, {
    refetchQueries: [{ query: GET_ROLES }],
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

  return (
    <Container>
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

export default AdminRolePage
