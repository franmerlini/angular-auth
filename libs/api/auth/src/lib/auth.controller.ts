import { Body, Controller, Get, Post, Req } from '@nestjs/common';

import { Request } from 'express';

import { Public } from '@angular-auth/libs/api/core';
import { AuthCredentials } from '@angular-auth/libs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  login(
    @Body() body: { email: string; password: string }
  ): Promise<AuthCredentials> {
    const { email, password } = body;
    return this.authService.login(email, password);
  }

  @Public()
  @Get('refresh-token')
  refreshToken(@Req() req: Request): Promise<AuthCredentials> {
    return this.authService.refreshToken(req);
  }
}
