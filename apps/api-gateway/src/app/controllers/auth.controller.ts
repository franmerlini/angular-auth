import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';

import { catchError, Observable } from 'rxjs';

import { LoginDTO, MicroservicesEnum, Public } from '@angular-auth/libs/api/shared';
import { AuthCredentials } from '@angular-auth/libs/shared';

@Controller()
export class AuthController {
  constructor(@Inject(MicroservicesEnum.AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  @Public()
  @Post('login')
  login(@Body() loginDTO: LoginDTO): Observable<AuthCredentials> {
    return this.authClient.send('login', loginDTO).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
