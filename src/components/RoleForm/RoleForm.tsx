'use client'

import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { PermissionAction, Resources } from '@/db/schema'

interface RoleFormProps {
  onSubmit: (role: {
    name: string
    permissions: { resource: Resources; actions: PermissionAction[] }[]
  }) => void
  name?: string
  permissions?: { resource: Resources; actions: PermissionAction[] }[]
}

const RoleForm: React.FC<RoleFormProps> = ({ onSubmit }) => {
  const [role, setRole] = useState({
    name: '',
    permissions: [
      {
        resource: Resources.newsArticle,
        actions: [PermissionAction.create, PermissionAction.read],
      },
    ],
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setRole((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePermissionChange = (
    index: number,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    const permissions = [...role.permissions]
    permissions[index] = {
      ...permissions[index],
      [name]: value,
    }
    setRole((prev) => ({
      ...prev,
      permissions,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(role)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Role Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={role.name}
          onChange={handleChange}
        />
      </Form.Group>
      {role.permissions.map((permission, index) => (
        <div key={index}>
          <Form.Group controlId={`resource-${index}`}>
            <Form.Label>Resource</Form.Label>
            <Form.Control
              as="select"
              name="resource"
              value={permission.resource}
              onChange={(e) => handlePermissionChange(index, e)}
            >
              {Object.values(Resources).map((resource) => (
                <option key={resource} value={resource}>
                  {resource}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId={`actions-${index}`}>
            <Form.Label>Actions</Form.Label>
            <Form.Control
              as="select"
              multiple
              name="actions"
              value={permission.actions}
              onChange={(e) => handlePermissionChange(index, e)}
            >
              {Object.values(PermissionAction).map((action) => (
                <option key={action} value={action}>
                  {action}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </div>
      ))}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export { RoleForm }
