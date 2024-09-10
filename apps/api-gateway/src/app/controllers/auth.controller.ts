import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';

import { catchError, Observable } from 'rxjs';

import { AuthClientPatternsEnum, LoginDto, MicroservicesEnum, Public } from '@angular-auth/libs/api/shared';
import { AuthCredentials, ControllersEnum } from '@angular-auth/libs/shared';

@Controller(ControllersEnum.AUTH)
export class AuthController {
  constructor(@Inject(MicroservicesEnum.AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  @Public()
  @Post('login')
  login(@Body() loginDto: LoginDto): Observable<AuthCredentials> {
    return this.authClient.send<AuthCredentials>(AuthClientPatternsEnum.LOGIN, loginDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
