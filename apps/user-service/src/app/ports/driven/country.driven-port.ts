import { DeleteResult, UpdateResult } from 'typeorm';

import { CreateCountryDto, UpdateCountryDto } from '@angular-auth/libs/api/shared';
import { Country } from '@angular-auth/libs/shared';

export interface CountryDrivenPort {
  createCountry(country: CreateCountryDto): Promise<Country>;
  updateCountry(id: number, country: UpdateCountryDto): Promise<UpdateResult>;
  deleteCountry(id: number): Promise<DeleteResult>;
  getCountry(id: number): Promise<Country | null>;
  getCountries(): Promise<Country[]>;
  getCountryByName(name: string): Promise<Country | null>;
}
