import { DeleteResult, UpdateResult } from 'typeorm';

import { CreateUserDTO, UpdateUserDTO, User } from '@angular-auth/libs/common';

export interface UserDrivenPort {
  createUser(user: CreateUserDTO): Promise<User>;
  createUserFromGoogle(user: Partial<User>): Promise<User>;
  updateUser(id: number, user: UpdateUserDTO): Promise<UpdateResult>;
  deleteUser(id: number): Promise<DeleteResult>;
  getUser(id: number): Promise<User | null>;
  getUsers(): Promise<User[]>;
  getUserByEmail(email: string): Promise<User | null>;
}
