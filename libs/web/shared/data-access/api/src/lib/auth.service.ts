import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, of } from 'rxjs';

import { CreateUserDTO, User } from '@angular-auth/libs/common';
import { APP_CONFIG } from '@angular-auth/libs/web/shared/utils/app-config';

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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly appConfig = inject(APP_CONFIG);
  private readonly baseURL = `${this.appConfig.baseURL}/auth`;

  register(user: CreateUserDTO): Observable<User> {
    console.log(user);
    // return this.http.post<User>(`${this.baseURL}/register`, { user });
    return of(mockedUser);
  }

  login(email: string, password: string): Observable<User> {
    console.log(email, password);
    // return this.http.post<User>(`${this.baseURL}/login`, { email, password });
    return of(mockedUser);
  }
}
