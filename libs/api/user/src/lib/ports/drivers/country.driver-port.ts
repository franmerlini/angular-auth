import { DeleteResult, UpdateResult } from 'typeorm';

import {
  Country,
  CreateCountryDTO,
  UpdateCountryDTO,
} from '@angular-auth/libs/common';

export interface CountryDriverPort {
  createCountry(country: CreateCountryDTO): Promise<Country>;
  updateCountry(id: number, country: UpdateCountryDTO): Promise<UpdateResult>;
  deleteCountry(id: number): Promise<DeleteResult>;
  getCountry(id: number): Promise<Country>;
  getCountries(): Promise<Country[]>;
}
