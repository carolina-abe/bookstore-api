import { LoginResponseBody } from 'App/Contracts/Auth'
import type { HttpContextContract } from 'App/Contracts/Common'
import { UserRole } from 'App/Contracts/Users'
import AuthService from 'App/Services/AuthService'
import LoginValidator from 'App/Validators/Auth/LoginValidator'

export default class AuthController {
  private readonly authService = new AuthService()

  public async clientLogin(ctx: HttpContextContract): Promise<LoginResponseBody> {
    await ctx.request.validate(LoginValidator)
    return this.authService.login(ctx, UserRole.CLIENT)
  }

  public async adminLogin(ctx: HttpContextContract): Promise<LoginResponseBody> {
    await ctx.request.validate(LoginValidator)
    return this.authService.login(ctx, UserRole.ADMIN)
  }

  public async logout(ctx: HttpContextContract): Promise<void> {
    await this.authService.logout(ctx)
  }
}
