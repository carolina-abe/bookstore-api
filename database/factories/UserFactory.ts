import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'
import { UserRole } from 'App/Contracts/Users'

export default Factory.define(User, ({ faker }) => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const email = faker.internet.email({ firstName, lastName }).toLowerCase()

  return {
    name: `${firstName} ${lastName}`,
    email: email,
    password: '123456',
  }
})
  .state('AdminRole', (user) => {
    user.role = UserRole.ADMIN
  })
  .build()
