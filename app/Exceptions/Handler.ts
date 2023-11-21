/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import type { HttpContextContract } from 'App/Contracts/Common'
import ValidationException from './ValidationException'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract): Promise<void> {
    if (error instanceof ValidationException) {
      return error.handle(error, ctx)
    }

    ctx.response.status(error.status || 500).send({
      message: error.message || 'Internal Server Error',
      code: error.code || 'E_INTERNAL_SERVER_ERROR',
    })
  }
}
