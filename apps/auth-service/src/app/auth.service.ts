import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';

import { compare } from 'bcrypt';

import { from, Observable, of, switchMap, throwError } from 'rxjs';

import {
  LoginDto,
  MicroservicesEnum,
  RpcNotFoundException,
  RpcUnauthorizedException,
  UserClientPatternsEnum,
} from '@angular-auth/libs/api/shared';
import { AuthCredentials, JwtPayload, User } from '@angular-auth/libs/shared';

import { EnvironmentVariables } from './model';

@Injectable()
export class AuthService {
  constructor(
    @Inject(MicroservicesEnum.USER_SERVICE) private readonly userClient: ClientProxy,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  login(loginDto: LoginDto): Observable<AuthCredentials> {
    const { email, password } = loginDto;

    return this.userClient.send<User>(UserClientPatternsEnum.GET_USER_BY_EMAIL, email).pipe(
      switchMap((user) => {
        if (!user) {
          return throwError(() => new RpcNotFoundException('User not found.'));
        }

        return from(compare(password, user.password)).pipe(
          switchMap((isValid) => {
            if (!isValid) {
              return throwError(() => new RpcUnauthorizedException('Invalid credentials.'));
            }

            return this.generateCredentials(user);
          }),
        );
      }),
    );
  }

  refreshToken(user: User): Observable<AuthCredentials> {
    return this.generateCredentials(user);
  }

  private generateCredentials(user: User): Observable<AuthCredentials> {
    const { id, email, role } = user;

    const jwtPayload: JwtPayload = {
      sub: id,
      email,
      role,
    };

    return of({
      userId: id,
      accessToken: this.jwtService.sign(jwtPayload, {
        expiresIn: this.configService.get('NX_JWT_TOKEN_EXPIRES_IN'),
      }),
      refreshToken: this.jwtService.sign(jwtPayload, {
        expiresIn: this.configService.get('NX_JWT_REFRESH_EXPIRES_IN'),
      }),
    });
  }
}
