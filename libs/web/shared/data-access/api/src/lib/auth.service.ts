import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { CreateUserDTO, User } from '@angular-auth/libs/common';
import { APP_CONFIG } from '@angular-auth/libs/web/shared/utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly appConfig = inject(APP_CONFIG);
  private readonly baseURL = `${this.appConfig.baseURL}/auth`;

  register(user: CreateUserDTO): Observable<User> {
    return this.http.post<User>(`${this.baseURL}/register`, user);
  }

  login(email: string, password: string): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(`${this.baseURL}/login`, {
      email,
      password,
    });
  }
}
