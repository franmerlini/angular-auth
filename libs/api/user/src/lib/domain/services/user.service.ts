import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SecurityConfigKeys } from '@angular-auth/libs/api/core';
import { CreateUserDTO, UpdateUserDTO, User } from '@angular-auth/libs/common';

import { hash } from 'bcrypt';

import { UserDrivenAdapter } from '../../adapters';
import { UserDrivenPort, UserDriverPort } from '../../ports';
import { CountryService } from './country.service';

@Injectable()
export class UserService implements UserDriverPort {
  constructor(
    @Inject(UserDrivenAdapter)
    private readonly userDrivenPort: UserDrivenPort,
    private readonly countryService: CountryService,
    private readonly configService: ConfigService
  ) {}

  async createUser(user: CreateUserDTO): Promise<User> {
    const { email, country } = user;

    const existsUser = await this.userDrivenPort.getUserByEmail(email);

    if (existsUser) {
      throw new ConflictException('User already exists.');
    }

    const countryData = await this.countryService.getCountry(country.id);

    if (!countryData) {
      throw new NotFoundException('Country not found.');
    }

    const userData = await this.encryptUserPassword(user);

    const { id: userId } = await this.userDrivenPort.createUser({
      ...userData,
      country: countryData,
    });

    return this.userDrivenPort.getUser(userId) as Promise<User>;
  }

  private async encryptUserPassword(
    user: CreateUserDTO
  ): Promise<CreateUserDTO> {
    const { password } = user;
    const hashSalt = this.configService.get(SecurityConfigKeys.HASH_SALT);
    return {
      ...user,
      password: await hash(password, hashSalt),
    };
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
