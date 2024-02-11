import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

import { AppConfigKeys, SecurityConfigKeys } from '@angular-auth/libs/api/core';
import { UserService } from '@angular-auth/libs/api/user';
import { User } from '@angular-auth/libs/common';

import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {
    const protocol = configService.get(AppConfigKeys.API_PROTOCOL);
    const host = configService.get(AppConfigKeys.API_HOST);
    const port = configService.get(AppConfigKeys.PORT);
    const apiPrefix = configService.get(AppConfigKeys.API_PREFIX);
    const apiUrl = `${protocol}://${host}:${port}/${apiPrefix}`;

    super({
      clientID: configService.get(SecurityConfigKeys.GOOGLE_CLIENT_ID),
      clientSecret: configService.get(SecurityConfigKeys.GOOGLE_CLIENT_SECRET),
      callbackURL: `${apiUrl}/auth/google/redirect`,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ): Promise<void> {
    const { name, emails, photos } = profile;
    const email = emails?.[0]?.value;

    if (!email) {
      throw new BadRequestException('Email not provided from Google.');
    }

    const existingUser = await this.authService.validateUser(email);

    if (existingUser) {
      done(null, existingUser);
      return;
    }

    const userToCreate: Partial<User> = {
      email,
      firstName: name?.givenName || '',
      lastName: name?.familyName || '',
      picture: photos?.[0]?.value || '',
    };

    const user = await this.userService.createUserFromGoogle(userToCreate);

    done(null, user);
  }
}
