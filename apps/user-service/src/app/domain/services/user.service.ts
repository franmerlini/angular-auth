import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { hash } from 'bcrypt';

import { User } from '@angular-auth/libs/common';

import { UserDrivenPort, UserDriverPort } from '../../ports';
import { CreateUserDTO, UpdateUserDTO } from '../dtos';
import { EnvironmentVariables } from '../models';
import { CountryService } from './country.service';

@Injectable()
export class UserService implements UserDriverPort {
  constructor(
    @Inject('foo') private readonly userDrivenPort: UserDrivenPort,
    private readonly countryService: CountryService,
    private readonly configService: ConfigService<EnvironmentVariables>,
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

    const password = await this.encryptUserPassword(user);

    const { id: userId } = await this.userDrivenPort.createUser({
      ...user,
      password,
      country: countryData,
    });

    return this.userDrivenPort.getUser(userId) as Promise<User>;
  }

  async createUserFromGoogle(user: Partial<User>): Promise<User> {
    return this.userDrivenPort.createUserFromGoogle(user);
  }

  private async encryptUserPassword(user: CreateUserDTO): Promise<string> {
    const { password } = user;
    const hashSalt = this.configService.get('NX_HASH_SALT');
    return hash(password, hashSalt);
  }

  async updateUser(id: number, user: UpdateUserDTO): Promise<User> {
    if (user.password) {
      user = {
        ...user,
        password: await this.encryptUserPassword(user),
      };
    }

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
