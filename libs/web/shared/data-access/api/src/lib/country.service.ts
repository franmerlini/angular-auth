import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { Country } from '@angular-auth/libs/common';
import { APP_CONFIG } from '@angular-auth/libs/web/shared/utils';

@Injectable()
export class CountryService {
  private readonly http = inject(HttpClient);
  private readonly appConfig = inject(APP_CONFIG);
  private readonly baseURL = `${this.appConfig.baseURL}/countries`;

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.baseURL);
  }
}
