import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-local';

import { User } from '@angular-auth/libs/shared';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(email);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const isValidPassword = await this.authService.validatePassword(user, password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    return user;
  }
}
