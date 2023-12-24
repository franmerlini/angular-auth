import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Country } from '@angular-auth/libs/common';
import { APP_CONFIG } from '@angular-auth/libs/web/shared/utils';

const mockedCountries: Country[] = [
  {
    id: 1,
    name: 'Argentina',
    code: 'AR',
  },
  {
    id: 2,
    name: 'Bolivia',
    code: 'BO',
  },
  {
    id: 3,
    name: 'Brasil',
    code: 'BR',
  },
  {
    id: 4,
    name: 'Chile',
    code: 'CL',
  },
  {
    id: 5,
    name: 'Colombia',
    code: 'CO',
  },
  {
    id: 6,
    name: 'Perú',
    code: 'PE',
  },
  {
    id: 7,
    name: 'Uruguay',
    code: 'UY',
  },
  {
    id: 8,
    name: 'Venezuela',
    code: 'VE',
  },
];

@Injectable()
export class CountryService {
  private readonly http = inject(HttpClient);
  private readonly appConfig = inject(APP_CONFIG);
  private readonly baseURL = `${this.appConfig.baseURL}/countries`;

  getCountries(): Observable<Country[]> {
    // return this.http.get<Country[]>(this.baseURL);
    return of(mockedCountries);
  }
}
