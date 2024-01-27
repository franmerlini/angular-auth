import { DeleteResult, UpdateResult } from 'typeorm';

import { CreateUserDTO, User } from '@angular-auth/libs/common';

export interface UserDrivenPort {
  createUser(user: CreateUserDTO): Promise<User>;
  updateUser(id: number, user: User): Promise<UpdateResult>;
  deleteUser(id: number): Promise<DeleteResult>;
  getUser(id: number): Promise<User>;
  getUsers(): Promise<User[]>;
  getUserByEmail(email: string): Promise<User>;
}
