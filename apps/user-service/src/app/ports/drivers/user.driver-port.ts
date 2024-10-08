import { User } from '@angular-auth/libs/shared';

import { CreateUserDTO, UpdateUserDTO } from '../../domain';

export interface UserDriverPort {
  createUser(user: CreateUserDTO): Promise<User>;
  createUserFromGoogle(user: Partial<User>): Promise<User>;
  updateUser(id: number, user: UpdateUserDTO): Promise<User>;
  deleteUser(id: number): Promise<void>;
  getUser(id: number): Promise<User>;
  getUsers(): Promise<User[]>;
  getUserByEmail(email: string): Promise<User | null>;
}
