import { CreateUserDto, UpdateUserDto } from '@angular-auth/libs/api/shared';
import { User } from '@angular-auth/libs/shared';

export interface UserDriverPort {
  createUser(user: CreateUserDto): Promise<User>;
  createUserFromGoogle(user: Partial<User>): Promise<User>;
  updateUser(id: number, user: UpdateUserDto): Promise<User>;
  deleteUser(id: number): Promise<void>;
  getUser(id: number): Promise<User>;
  getUsers(): Promise<User[]>;
  getUserByEmail(email: string): Promise<User | null>;
}
