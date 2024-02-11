import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { AuthCredentials, AuthUrlsEnum } from '@angular-auth/libs/common';
import { APP_CONFIG } from '@angular-auth/libs/web/shared/utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly appConfig = inject(APP_CONFIG);

  googleAuth(): void {
    window.location.href = `${this.appConfig.baseURL}${AuthUrlsEnum.GOOGLE_LOGIN}`;
  }

  login(email: string, password: string): Observable<AuthCredentials> {
    return this.http.post<AuthCredentials>(
      `${this.appConfig.baseURL}${AuthUrlsEnum.LOGIN}`,
      { email, password }
    );
  }

  refreshToken(): Observable<AuthCredentials> {
    return this.http.get<AuthCredentials>(
      `${this.appConfig.baseURL}${AuthUrlsEnum.REFRESH_TOKEN}`
    );
  }
}
