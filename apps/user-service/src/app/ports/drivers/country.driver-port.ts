import { Country } from '@angular-auth/libs/shared';

import { CreateCountryDTO, UpdateCountryDTO } from '../../domain';

export interface CountryDriverPort {
  createCountry(country: CreateCountryDTO): Promise<Country>;
  updateCountry(id: number, country: UpdateCountryDTO): Promise<Country>;
  deleteCountry(id: number): Promise<void>;
  getCountry(id: number): Promise<Country>;
  getCountries(): Promise<Country[]>;
  getCountryByName(name: string): Promise<Country>;
}
