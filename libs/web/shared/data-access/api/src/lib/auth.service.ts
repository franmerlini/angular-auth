import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, of } from 'rxjs';

import { User } from '@angular-auth/libs/web/shared/data-access/models';
import { APP_CONFIG } from '@angular-auth/libs/web/shared/utils/app-config';

const mockedUser: User = {
  id: 1,
  email: 'johndoe@mail.com',
  name: 'John Doe',
  avatar: '',
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

  register(email: string, password: string): Observable<User> {
    console.log(email, password);
    // return this.http.post<User>(`${this.baseURL}/register`, { email, password });
    return of(mockedUser);
  }

  login(email: string, password: string): Observable<User> {
    console.log(email, password);
    // return this.http.post<User>(`${this.baseURL}/login`, { email, password });
    return of(mockedUser);
  }
}
