import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { CreateUserDto } from '@angular-auth/libs/api/shared';
import { User } from '@angular-auth/libs/shared';
import { APP_CONFIG } from '@angular-auth/libs/web/shared/utils';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly appConfig = inject(APP_CONFIG);
  private readonly baseURL = `${this.appConfig.baseURL}/user`;

  createUser(user: CreateUserDto): Observable<User> {
    return this.http.post<User>(`${this.baseURL}`, user);
  }

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.baseURL}/${userId}`);
  }
}
