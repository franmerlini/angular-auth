import { User } from '../models';

export type CreateUserDTO = Omit<User, 'id'> & { password: string };
