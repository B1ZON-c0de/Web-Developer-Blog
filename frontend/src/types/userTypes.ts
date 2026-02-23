export interface User {
  id: string
  login: string
  roleId: number | null
  createdAt?: string
  registeredAt?: string
}
