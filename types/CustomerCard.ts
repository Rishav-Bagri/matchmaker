export type DashboardUser = {
  id: string
  firstName: string
  lastName: string
  age: number
  city: string
  maritalStatus: string
  designation: string
  company: string
  status: string
  lastActivity?: string
}
export type UserCardProps = DashboardUser