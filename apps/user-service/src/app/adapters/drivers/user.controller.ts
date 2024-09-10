import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CreateUserDto, UpdateUserDto, UserClientPatternsEnum } from '@angular-auth/libs/api/shared';
import { User } from '@angular-auth/libs/shared';

import { UserService } from '../../domain';
import { UserDriverPort } from '../../ports';

@Controller()
export class UserController {
  constructor(@Inject(UserService) private readonly userDriverPort: UserDriverPort) {}

  @MessagePattern(UserClientPatternsEnum.GET_USER)
  getUser(@Payload() id: number): Promise<User> {
    return this.userDriverPort.getUser(id);
  }

  @MessagePattern(UserClientPatternsEnum.GET_USER_BY_EMAIL)
  getUserByEmail(@Payload() email: string): Promise<User> {
    return this.userDriverPort.getUserByEmail(email);
  }

  @MessagePattern(UserClientPatternsEnum.GET_USERS)
  getUsers(): Promise<User[]> {
    return this.userDriverPort.getUsers();
  }

  @MessagePattern(UserClientPatternsEnum.CREATE_USER)
  createUser(@Payload() createUserDto: CreateUserDto): Promise<User> {
    return this.userDriverPort.createUser(createUserDto);
  }

  @MessagePattern(UserClientPatternsEnum.UPDATE_USER)
  updateUser(@Payload() { id, updateUserDto }: { id: number; updateUserDto: UpdateUserDto }): Promise<User> {
    return this.userDriverPort.updateUser(id, updateUserDto);
  }

  @MessagePattern(UserClientPatternsEnum.DELETE_USER)
  deleteUser(@Payload() id: number): Promise<void> {
    return this.userDriverPort.deleteUser(id);
  }
}
