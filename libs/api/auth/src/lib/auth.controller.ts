import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserDTO, User } from '@angular-auth/libs/common';

import { AuthService } from './auth.service';
import { Public } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() body: CreateUserDTO): Promise<User> {
    return this.authService.register(body);
  }

  @Public()
  @Post('login')
  login(
    @Body() body: { email: string; password: string }
  ): Promise<{ accessToken: string }> {
    const { email, password } = body;
    return this.authService.login(email, password);
  }
}
