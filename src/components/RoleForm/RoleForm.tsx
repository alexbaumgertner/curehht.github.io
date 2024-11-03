'use client'

import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { PermissionAction, Resources } from '@/db/types'
import Table from 'react-bootstrap/Table'

type RoleFormProps = {
  onSubmit: (role: {
    name: string
    permissions: { resource: Resources; actions: PermissionAction[] }[]
  }) => void
  name?: string
  permissions?: { resource: Resources; actions: PermissionAction[] }[]
}

const RoleForm: React.FC<RoleFormProps> = ({ onSubmit }) => {
  const [role, setRole] = useState({
    name: 'New role',
    permissions: [
      {
        resource: Resources.newsArticle,
        actions: [PermissionAction.read],
      },
      {
        resource: Resources.articles,
        actions: [PermissionAction.create, PermissionAction.read],
      },
    ],
  })

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setRole((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(role)
  }

  const handlePermissionChange = (e) => {
    const { name, value, checked } = e.target
    setRole((prev) => ({
      ...prev,
      permissions: prev.permissions.map((permission) =>
        permission.resource === name
          ? {
              ...permission,
              actions: checked
                ? [...permission.actions, value]
                : permission.actions.filter((action) => action !== value),
            }
          : permission
      ),
    }))
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Role name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={role.name}
          onChange={handleNameChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Resource name</th>
              <th>Create</th>
              <th>Read</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {role.permissions.map((permission) => (
              <tr key={permission.resource}>
                <td>{permission.resource}</td>
                <td>
                  <Form.Check
                    type="checkbox"
                    label={permission.resource}
                    name={permission.resource}
                    value={PermissionAction.create}
                    onChange={handlePermissionChange}
                    checked={permission.actions.includes(
                      PermissionAction.create
                    )}
                  />
                </td>
                <td>
                  <Form.Check
                    type="checkbox"
                    label={permission.resource}
                    name={permission.resource}
                    value={PermissionAction.read}
                    onChange={handlePermissionChange}
                    checked={permission.actions.includes(PermissionAction.read)}
                  />
                </td>
                <td>
                  <Form.Check
                    type="checkbox"
                    label={permission.resource}
                    name={permission.resource}
                    value={PermissionAction.update}
                    onChange={handlePermissionChange}
                    checked={permission.actions.includes(
                      PermissionAction.update
                    )}
                  />
                </td>
                <td>
                  <Form.Check
                    type="checkbox"
                    label={PermissionAction.delete}
                    name={permission.resource}
                    value={PermissionAction.delete}
                    onChange={handlePermissionChange}
                    checked={permission.actions.includes(
                      PermissionAction.delete
                    )}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button type="submit">Submit</Button>
      </Form.Group>
    </Form>
  )
}

export { RoleForm }
