import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { CreateUserDTO, UpdateUserDTO, User } from '@angular-auth/libs/common';

import { UserDrivenAdapter } from '../../adapters';
import { UserDrivenPort, UserDriverPort } from '../../ports';

@Injectable()
export class UserService implements UserDriverPort {
  constructor(
    @Inject(UserDrivenAdapter)
    private readonly userDrivenPort: UserDrivenPort
  ) {}

  async createUser(user: CreateUserDTO): Promise<User> {
    const { id } = await this.userDrivenPort.createUser(user);
    return this.userDrivenPort.getUser(id) as Promise<User>;
  }

  async updateUser(id: number, user: UpdateUserDTO): Promise<User> {
    const { affected } = await this.userDrivenPort.updateUser(id, user);

    if (affected === 0) {
      throw new NotFoundException(`User with ID ${id} doesn't exist.`);
    }

    return this.userDrivenPort.getUser(id) as Promise<User>;
  }

  async deleteUser(id: number): Promise<void> {
    const existsUser = await this.userDrivenPort.getUser(id);

    if (!existsUser) {
      throw new NotFoundException(`User with ID ${id} doesn't exist.`);
    }

    this.userDrivenPort.deleteUser(id);
  }

  async getUser(id: number): Promise<User> {
    const user = await this.userDrivenPort.getUser(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} doesn't exist.`);
    }

    return user;
  }

  async getUsers(): Promise<User[]> {
    return this.userDrivenPort.getUsers();
  }

  getUserByEmail(email: string): Promise<User | null> {
    return this.userDrivenPort.getUserByEmail(email);
  }
}
