import { DeleteResult, UpdateResult } from 'typeorm';

import { CreateUserDto, UpdateUserDto } from '@angular-auth/libs/api/shared';
import { User } from '@angular-auth/libs/shared';

export interface UserDrivenPort {
  createUser(user: CreateUserDto): Promise<User>;
  createUserFromGoogle(user: Partial<User>): Promise<User>;
  updateUser(id: number, user: UpdateUserDto): Promise<UpdateResult>;
  deleteUser(id: number): Promise<DeleteResult>;
  getUser(id: number): Promise<User | null>;
  getUsers(): Promise<User[]>;
  getUserByEmail(email: string): Promise<User | null>;
}
