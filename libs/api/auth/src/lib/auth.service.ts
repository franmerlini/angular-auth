import { Injectable } from '@nestjs/common';

import { CountryService, UserService } from '@angular-auth/libs/api/user';
import { CreateUserDTO, User } from '@angular-auth/libs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly countryService: CountryService
  ) {}

  async register(user: CreateUserDTO): Promise<User> {
    try {
      const { email } = user;
      const { id } = user.country;

      const existsUser = await this.userService.getUserByEmail(email);

      if (existsUser) {
        throw new Error('User already exists.');
      }

      const country = await this.countryService.getCountry(id);

      if (!country) {
        throw new Error('Country not found.');
      }

      return await this.userService.createUser({
        ...user,
        country,
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async login(email: string, password: string): Promise<User> {
    try {
      console.log(email, password);

      const user = await this.userService.getUserByEmail(email);

      if (!user) {
        throw new Error('User not found.');
      }

      return user;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
