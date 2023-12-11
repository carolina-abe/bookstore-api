import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from 'App/Contracts/Common'

type ConstructorProps = {
  message?: string
  status?: number
  code?: string
}

export default class AuthorizationException extends Exception {
  constructor(props: ConstructorProps) {
    super(
      props.message || 'Authorization Error',
      props.status || 401,
      props.code || 'E_AUTHORIZATION_FAILURE'
    )
  }

  public async handle(error: this, ctx: HttpContextContract): Promise<void> {
    ctx.response.status(error.status).send({
      message: error.message.replace(`${error.code}: `, ''),
      code: error.code,
    })
  }
}
