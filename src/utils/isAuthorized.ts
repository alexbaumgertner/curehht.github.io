import { UserData, PermissionAction, Resources } from '@/db/types'

export const isAuthorized = ({
  userData,
  resourceName,
  resourceAuthorId,
  action,
}: {
  userData?: UserData
  resourceName: Resources
  resourceAuthorId?: string
  action: PermissionAction
}) => {
  if (!userData) return false

  // Check if user has permission to perform action on resource
  if (
    userData.role.permissions.some(
      (p) => p.resource === resourceName && p.actions.includes(action)
    )
  ) {
    return true
  }

  // Check if user is the author of the resource
  if (resourceAuthorId && userData.id === resourceAuthorId) {
    return true
  }

  return false
}
