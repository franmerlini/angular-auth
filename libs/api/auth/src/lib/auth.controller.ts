import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';

import { Request, Response } from 'express';

import { Public } from '@angular-auth/libs/api/core';
import { AuthCredentials } from '@angular-auth/libs/common';

import { AuthService } from './auth.service';
import { GoogleGuard, LocalAuthGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: Request): Promise<AuthCredentials> {
    return this.authService.generateCredentials(req.user);
  }

  @Get('refresh-token')
  refreshToken(@Req() req: Request): Promise<AuthCredentials> {
    return this.authService.generateCredentials(req.user);
  }

  @Public()
  @Get('google')
  @UseGuards(GoogleGuard)
  async googleAuth(): Promise<void> {}

  @Public()
  @Get('google/redirect')
  @UseGuards(GoogleGuard)
  async googleAuthRedirect(
    @Req() req: Request,
    @Res() res: Response
  ): Promise<void> {
    const { userId, accessToken, refreshToken } =
      await this.authService.generateCredentials(req.user);

    const redirectUrl = `http://localhost:4200/redirect?userId=${userId}&accessToken=${accessToken}&refreshToken=${refreshToken}`;

    res.redirect(redirectUrl);
  }
}
