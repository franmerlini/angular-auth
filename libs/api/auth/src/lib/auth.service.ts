import { Injectable } from '@nestjs/common';

import { CreateUserDTO, User } from '@angular-auth/libs/common';

const mockedUser: User = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@mail.com',
  city: 'New York',
  country: {
    id: 1,
    name: 'United States',
    code: 'US',
  },
  role: 'admin',
  token: '1234567890',
};

@Injectable()
export class AuthService {
  register(user: CreateUserDTO): Promise<User> {
    console.log('AuthService.register', user);
    return Promise.resolve(mockedUser);
  }

  login(email: string, password: string): Promise<User> {
    console.log('AuthService.login', email, password);
    return Promise.resolve(mockedUser);
  }
}
