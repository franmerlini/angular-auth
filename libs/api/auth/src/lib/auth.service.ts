import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { compare, hash } from 'bcrypt';

import { SecurityConfigKeys } from '@angular-auth/libs/api/core';
import { CountryService, UserService } from '@angular-auth/libs/api/user';
import { CreateUserDTO, User } from '@angular-auth/libs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly countryService: CountryService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
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

    const userData = await this.encryptUserPassword(user);

    return await this.userService.createUser({
      ...userData,
      country,
    });
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

  async login(
    email: string,
    password: string
  ): Promise<{ accessToken: string }> {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const { password: userPassword, id, username, role } = user;

    const isValidPassword = await compare(password, userPassword);

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const payload = { sub: id, username, role };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
