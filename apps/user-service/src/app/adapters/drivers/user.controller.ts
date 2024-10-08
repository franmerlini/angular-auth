import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';

import { Public } from '@angular-auth/libs/api/shared';
import { User } from '@angular-auth/libs/shared';

import { CreateUserDTO, UpdateUserDTO, UserService } from '../../domain';
import { UserDriverPort } from '../../ports';

@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private readonly userDriverPort: UserDriverPort) {}

  @Get(':id')
  getUser(@Param('id') id: number): Promise<User> {
    return this.userDriverPort.getUser(id);
  }

  @Get()
  getUsers(): Promise<User[]> {
    return this.userDriverPort.getUsers();
  }

  @Public()
  @Post()
  createUser(@Body() body: CreateUserDTO): Promise<User> {
    return this.userDriverPort.createUser(body);
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() body: UpdateUserDTO): Promise<User> {
    return this.userDriverPort.updateUser(id, body);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number): Promise<void> {
    return this.userDriverPort.deleteUser(id);
  }
}
