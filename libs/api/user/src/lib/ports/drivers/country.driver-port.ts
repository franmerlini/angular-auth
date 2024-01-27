import { DeleteResult, UpdateResult } from 'typeorm';

import { Country, CreateCountryDTO } from '@angular-auth/libs/common';

export interface CountryDriverPort {
  createCountry(country: CreateCountryDTO): Promise<Country>;
  updateCountry(id: number, country: Country): Promise<UpdateResult>;
  deleteCountry(id: number): Promise<DeleteResult>;
  getCountry(id: number): Promise<Country>;
  getCountries(): Promise<Country[]>;
}
