import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateUserDto, UpdateUserDto } from '@angular-auth/libs/api/shared';
import { User } from '@angular-auth/libs/shared';

import { UserEntity } from '../../domain';
import { UserDrivenPort } from '../../ports';

@Injectable()
export class UserDrivenAdapter implements UserDrivenPort {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<User>) {}

  createUser(user: CreateUserDto): Promise<User> {
    return this.userRepository.save(user);
  }

  createUserFromGoogle(user: Partial<User>): Promise<User> {
    return this.userRepository.save(user);
  }

  updateUser(id: number, user: UpdateUserDto): Promise<UpdateResult> {
    return this.userRepository.update(id, user);
  }

  deleteUser(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  getUser(id: number): Promise<User | null> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.country', 'country')
      .where('user.id = :id', { id })
      .getOne();
  }

  getUsers(): Promise<User[]> {
    return this.userRepository.createQueryBuilder('user').leftJoinAndSelect('user.country', 'country').getMany();
  }

  getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.createQueryBuilder('user').where('user.email = :email', { email }).getOne();
  }
}
