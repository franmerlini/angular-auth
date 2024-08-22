import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { PassportStrategy } from '@nestjs/passport';

import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

import { firstValueFrom } from 'rxjs';

import { User } from '@angular-auth/libs/shared';

import { AuthService } from '../auth.service';
import { EnvironmentVariables } from '../model';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly authService: AuthService,
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
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

    const user = await firstValueFrom(this.userServiceClient.send('create_user', userToCreate));

    done(null, user);
  }
}
