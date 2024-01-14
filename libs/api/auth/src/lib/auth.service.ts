import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CountryEntity, UserEntity } from '@angular-auth/libs/api/database';
import { CreateUserDTO } from '@angular-auth/libs/common';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(CountryEntity)
    private readonly countryRepository: Repository<CountryEntity>
  ) {}

  async register(user: CreateUserDTO): Promise<UserEntity> {
    try {
      const { email } = user;
      const { id } = user.country;

      const userExists = await this.userRepository.findOne({
        where: { email },
      });

      if (userExists) {
        throw new Error('User already exists.');
      }

      const country = await this.countryRepository.findOne({
        where: { id },
      });

      if (!country) {
        throw new Error('Country not found.');
      }

      const newUser = this.userRepository.create({
        ...user,
        country,
      });

      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(email: string, password: string): Promise<UserEntity> {
    try {
      console.log(email, password);

      const user = await this.userRepository.findOne({
        where: { email },
      });

      if (!user) {
        throw new Error('User not found.');
      }

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
