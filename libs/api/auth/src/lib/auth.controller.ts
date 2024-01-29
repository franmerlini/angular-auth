import { Body, Controller, Post } from '@nestjs/common';

import { Public } from '@angular-auth/libs/api/core';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  login(
    @Body() body: { email: string; password: string }
  ): Promise<{ accessToken: string }> {
    const { email, password } = body;
    return this.authService.login(email, password);
  }
}
