import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { PassportStrategy } from '@nestjs/passport';

import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

import { firstValueFrom } from 'rxjs';

import { MicroservicesEnum } from '@angular-auth/libs/api/shared';
import { User } from '@angular-auth/libs/shared';

import { EnvironmentVariables } from '../models';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    @Inject(MicroservicesEnum.USER_SERVICE) private readonly userClient: ClientProxy,
  ) {
    const protocol = 'http';
    const host = 'localhost';
    const port = 3000;
    const apiPrefix = 'api';
    const apiUrl = `${protocol}://${host}:${port}/${apiPrefix}`;

    super({
      clientID: configService.get('NX_GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('NX_GOOGLE_CLIENT_SECRET'),
      callbackURL: `${apiUrl}/auth/google/redirect`,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback): Promise<void> {
    const { name, emails, photos } = profile;
    const email = emails?.[0]?.value;

    if (!email) {
      throw new BadRequestException('Email not provided from Google.');
    }

    const existingUser = await firstValueFrom(this.userClient.send<User>('get_user_by_email', email));

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

    const user = await firstValueFrom(this.userClient.send<User>('create_user', userToCreate));

    done(null, user);
  }
}
