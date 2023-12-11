import Route from '@ioc:Adonis/Core/Route'

const c = 'AuthController'

Route.group(() => {
  Route.post('/client-login', `${c}.clientLogin`)
  Route.post('/admin-login', `${c}.adminLogin`)
}).prefix('auth')

Route.group(() => {
  Route.post('/logout', `${c}.logout`)
})
  .prefix('auth')
  .middleware('auth')
