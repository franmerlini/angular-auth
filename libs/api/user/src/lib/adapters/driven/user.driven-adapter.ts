import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, UpdateResult } from 'typeorm';

import { CreateUserDTO, User } from '@angular-auth/libs/common';

import { UserDrivenPort } from '../../ports';

export const USER_DRIVEN_ADAPTER_TOKEN = 'user-driven-adapter-token';

@Injectable()
export class UserDrivenAdapter implements UserDrivenPort {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async createUser(user: CreateUserDTO): Promise<User> {
    try {
      const repoUser = await this.userRepository.findOne({
        where: { email: user.email },
      });

      if (repoUser) {
        throw new ConflictException('User already exists.');
      }

      return await this.userRepository.save(user);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async updateUser(id: number, user: User): Promise<UpdateResult> {
    try {
      const repoUser = await this.userRepository.findOne({
        where: { id },
      });

      if (!repoUser) {
        throw new NotFoundException('User not found.');
      }

      return await this.userRepository.update(id, user);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      const repoUser = await this.userRepository.findOne({
        where: { id },
      });

      if (!repoUser) {
        throw new NotFoundException('User not found.');
      }

      await this.userRepository.delete(id);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async getUser(id: number): Promise<User> {
    try {
      const repoUser = await this.userRepository.findOne({
        where: { id },
      });

      if (!repoUser) {
        throw new NotFoundException('User not found.');
      }

      return repoUser;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      const repoUser = await this.userRepository.findOne({
        where: { email },
      });

      if (!repoUser) {
        throw new NotFoundException('User not found.');
      }

      return repoUser;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
