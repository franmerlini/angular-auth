import { Inject, Injectable } from '@nestjs/common';

import { DeleteResult, UpdateResult } from 'typeorm';

import { CreateUserDTO, User } from '@angular-auth/libs/common';

import { USER_DRIVEN_ADAPTER_TOKEN } from '../../adapters';
import { UserDrivenPort, UserDriverPort } from '../../ports';

@Injectable()
export class UserService implements UserDriverPort {
  constructor(
    @Inject(USER_DRIVEN_ADAPTER_TOKEN)
    private readonly userDrivenPort: UserDrivenPort
  ) {}

  async createUser(user: CreateUserDTO): Promise<User> {
    return this.userDrivenPort.createUser(user);
  }

  async updateUser(id: number, user: User): Promise<UpdateResult> {
    return this.userDrivenPort.updateUser(id, user);
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    return this.userDrivenPort.deleteUser(id);
  }

  async getUser(id: number): Promise<User> {
    return this.userDrivenPort.getUser(id);
  }

  async getUsers(): Promise<User[]> {
    return this.userDrivenPort.getUsers();
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userDrivenPort.getUserByEmail(email);
  }
}
