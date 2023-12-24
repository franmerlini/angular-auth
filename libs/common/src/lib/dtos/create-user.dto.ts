import { User } from '../models';

export type CreateUserDTO = Omit<User, 'id' | 'role' | 'token'> & {
  password: string;
};
