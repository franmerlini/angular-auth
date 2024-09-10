import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';

import { catchError, Observable } from 'rxjs';

import { CreateUserDto, MicroservicesEnum, Public, UserClientPatternsEnum } from '@angular-auth/libs/api/shared';
import { AuthCredentials, ControllersEnum, User } from '@angular-auth/libs/shared';

@Controller(ControllersEnum.USER)
export class UserController {
  constructor(@Inject(MicroservicesEnum.USER_SERVICE) private readonly userClient: ClientProxy) {}

  @Public()
  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Observable<AuthCredentials> {
    return this.userClient.send<AuthCredentials>(UserClientPatternsEnum.CREATE_USER, createUserDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): Observable<User> {
    return this.userClient.send<User>(UserClientPatternsEnum.GET_USER, id).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
