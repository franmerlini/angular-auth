import { CreateUserDTO, UpdateUserDTO, User } from '@angular-auth/libs/common';

export interface UserDriverPort {
  createUser(user: CreateUserDTO): Promise<User>;
  updateUser(id: number, user: UpdateUserDTO): Promise<User>;
  deleteUser(id: number): Promise<void>;
  getUser(id: number): Promise<User>;
  getUsers(): Promise<User[]>;
  getUserByEmail(email: string): Promise<User | null>;
}
