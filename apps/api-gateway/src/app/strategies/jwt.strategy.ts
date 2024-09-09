import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { map, Observable } from 'rxjs';

import { MicroservicesEnum } from '@angular-auth/libs/api/shared';
import { JwtPayload, User } from '@angular-auth/libs/shared';

import { EnvironmentVariables } from '../models';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    @Inject(MicroservicesEnum.USER_SERVICE) private readonly userClient: ClientProxy,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('NX_JWT_SECRET'),
    });
  }

  validate(payload: JwtPayload): Observable<User | NotFoundException> {
    return this.userClient.send<User>('get_user_by_email', payload.email).pipe(
      map((user) => {
        if (!user) {
          throw new NotFoundException('User not found.');
        }
        return user;
      }),
    );
  }
}
