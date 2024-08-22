import { DeleteResult, UpdateResult } from 'typeorm';

import { Country } from '@angular-auth/libs/shared';

import { CreateCountryDTO, UpdateCountryDTO } from '../../domain';

export interface CountryDrivenPort {
  createCountry(country: CreateCountryDTO): Promise<Country>;
  updateCountry(id: number, country: UpdateCountryDTO): Promise<UpdateResult>;
  deleteCountry(id: number): Promise<DeleteResult>;
  getCountry(id: number): Promise<Country | null>;
  getCountries(): Promise<Country[]>;
  getCountryByName(name: string): Promise<Country | null>;
}
