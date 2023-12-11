import Route from '@ioc:Adonis/Core/Route'
import 'App/Routes/Auth'

Route.get('/', async () => {
  return { hello: 'world' }
})
