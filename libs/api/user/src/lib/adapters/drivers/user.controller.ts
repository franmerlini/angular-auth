import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { DeleteResult, UpdateResult } from 'typeorm';

import { CreateUserDTO, User, UserDTO } from '@angular-auth/libs/common';

import { UserService } from '../../domain';
import { UserDriverPort } from '../../ports';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly userDriverPort: UserDriverPort
  ) {}

  @Get(':id')
  getUser(@Param('id') id: number): Promise<User | null> {
    return this.userDriverPort.getUser(id);
  }

  @Get()
  getUsers(): Promise<User[]> {
    return this.userDriverPort.getUsers();
  }

  @Post()
  createUser(@Body() body: CreateUserDTO): Promise<User> {
    return this.userDriverPort.createUser(body);
  }

  @Put(':id')
  updateUser(
    @Param('id') id: number,
    @Body() body: UserDTO
  ): Promise<UpdateResult> {
    return this.userDriverPort.updateUser(id, body);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number): Promise<DeleteResult> {
    return this.userDriverPort.deleteUser(id);
  }
}
