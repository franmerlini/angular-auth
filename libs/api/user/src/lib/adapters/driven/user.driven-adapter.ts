import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateUserDTO, UpdateUserDTO, User } from '@angular-auth/libs/common';

import { UserDrivenPort } from '../../ports';

export const USER_DRIVEN_ADAPTER_TOKEN = 'user-driven-adapter-token';

@Injectable()
export class UserDrivenAdapter implements UserDrivenPort {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async createUser(user: CreateUserDTO): Promise<User> {
    const repoUser = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (repoUser) {
      throw new ConflictException('User already exists.');
    }

    return await this.userRepository.save(user);
  }

  async updateUser(id: number, user: UpdateUserDTO): Promise<UpdateResult> {
    const repoUser = await this.userRepository.findOne({
      where: { id },
    });

    if (!repoUser) {
      throw new NotFoundException('User not found.');
    }

    return await this.userRepository.update(id, user);
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    const repoUser = await this.userRepository.findOne({
      where: { id },
    });

    if (!repoUser) {
      throw new NotFoundException('User not found.');
    }

    return await this.userRepository.delete(id);
  }

  async getUser(id: number): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }
}
