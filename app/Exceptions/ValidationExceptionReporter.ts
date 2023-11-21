import type { ErrorReporterContract, MessagesBagContract } from '@ioc:Adonis/Core/Validator'
import { ValidationException } from '@ioc:Adonis/Core/Validator'

type ValidationError = {
  message: string
  field: string
}

type ErrorBody = {
  message: string
  validationErrors: ValidationError[]
  code: string
}

export default class ValidationExceptionReporter implements ErrorReporterContract<ErrorBody> {
  public hasErrors: boolean
  private validationErrors: ValidationError[] = []

  constructor(
    private messages: MessagesBagContract,
    private bail: boolean
  ) {}

  public report(
    pointer: string,
    rule: string,
    message?: string | undefined,
    arrayExpressionPointer?: string | undefined,
    args?: any
  ): void {
    this.hasErrors = true
    const errorMessage = this.messages.get(
      pointer,
      rule,
      message || `${pointer} field is invalid`,
      arrayExpressionPointer,
      args
    )

    this.validationErrors.push({
      field: pointer,
      message: errorMessage,
    })

    if (this.bail) {
      throw new this.toError()
    }
  }
  public toError() {
    throw new ValidationException(false, this.toJSON())
  }
  public toJSON(): ErrorBody {
    return {
      message: 'Validation Error',
      validationErrors: this.validationErrors,
      code: 'E_VALIDATION_FAILURE',
    }
  }
}
