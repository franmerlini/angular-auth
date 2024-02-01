import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { Request } from 'express';

import { Public } from '@angular-auth/libs/api/core';
import { AuthCredentials, User } from '@angular-auth/libs/common';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: Request): Promise<AuthCredentials> {
    const { user } = req;
    return this.authService.generateCredentials(user as User);
  }

  @Get('refresh-token')
  refreshToken(@Req() req: Request): Promise<AuthCredentials> {
    const { user } = req;
    return this.authService.generateCredentials(user as User);
  }
}
