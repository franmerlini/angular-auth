import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateUserDTO, UpdateUserDTO, User } from '@angular-auth/libs/common';

import { UserDrivenPort } from '../../ports';

@Injectable()
export class UserDrivenAdapter implements UserDrivenPort {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  createUser(user: CreateUserDTO): Promise<User> {
    return this.userRepository.save(user);
  }

  updateUser(id: number, user: UpdateUserDTO): Promise<UpdateResult> {
    return this.userRepository.update(id, user);
  }

  deleteUser(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  getUser(id: number): Promise<User | null> {
    return this.userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.country', 'country')
      .where('user.id = :id', { id })
      .getOne();
  }

  getUsers(): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.country', 'country')
      .getMany();
  }

  getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
  }
}
