import User from 'App/Models/User'

export type LoginResponseBody = {
  token: string
  user: Pick<User, 'id' | 'email' | 'name' | 'role'>
}
