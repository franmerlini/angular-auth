import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { hash } from 'bcrypt';

import { SecurityConfigKeys } from '@angular-auth/libs/api/core';
import { CountryService, UserService } from '@angular-auth/libs/api/user';
import { CreateUserDTO, User } from '@angular-auth/libs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly countryService: CountryService,
    private readonly configService: ConfigService
  ) {}

  async register(user: CreateUserDTO): Promise<User> {
    const { email } = user;
    const { id } = user.country;

    const existsUser = await this.userService.getUserByEmail(email);

    if (existsUser) {
      throw new ConflictException('User already exists.');
    }

    const country = await this.countryService.getCountry(id);

    if (!country) {
      throw new NotFoundException('Country not found.');
    }

    const userData = await this.hashUserPassword(user);

    return await this.userService.createUser({
      ...userData,
      country,
    });
  }

  private async hashUserPassword(user: CreateUserDTO): Promise<CreateUserDTO> {
    const { password } = user;
    const hashSalt = this.configService.get(SecurityConfigKeys.HASH_SALT);
    return {
      ...user,
      password: await hash(password, hashSalt),
    };
  }

  async login(email: string, password: string): Promise<User> {
    console.log(email, password);

    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }
}
