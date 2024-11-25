export enum PermissionAction {
  read = 'read',
  create = 'create',
  update = 'update',
  delete = 'delete',
}

export enum Resources {
  newsArticle = 'newsArticle',
  articles = 'articles',
  roles = 'roles',
}

export interface Permission {
  actions: PermissionAction[]
  resource: Resources
}

export interface Role {
  id: string
  name: string
  permissions: Permission[]
  created_at: Date
  updated_at: Date
  owner_id: string
}

export interface UserData {
  id: string
  name: string
  email: string
  emailVerified: Date | null
  image: string
  role_id: string
  role: Role
  sessionExpires: Date
}
