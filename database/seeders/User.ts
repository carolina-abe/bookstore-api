import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import UserFactory from 'Database/factories/UserFactory'

const admins: Partial<User>[] = [
  {
    name: 'Ademir',
    email: 'ademir@example.com',
    password: 'ademir',
  },
]

const clients: Partial<User>[] = [
  {
    name: 'Client',
    email: 'client@example.com',
    password: 'client',
  },
]

export default class extends BaseSeeder {
  public async run() {
    await User.truncate()
    await UserFactory.merge(admins).apply('AdminRole').createMany(5)
    await UserFactory.merge(clients).createMany(15)
  }
}
