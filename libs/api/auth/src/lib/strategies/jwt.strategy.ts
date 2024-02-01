import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { SecurityConfigKeys } from '@angular-auth/libs/api/core';
import { JwtPayload, User } from '@angular-auth/libs/common';

import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get(SecurityConfigKeys.JWT_SECRET),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    return this.authService.validateUser(payload.email);
  }
}
