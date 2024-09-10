import { CreateCountryDto, UpdateCountryDto } from '@angular-auth/libs/api/shared';
import { Country } from '@angular-auth/libs/shared';

export interface CountryDriverPort {
  createCountry(country: CreateCountryDto): Promise<Country>;
  updateCountry(id: number, country: UpdateCountryDto): Promise<Country>;
  deleteCountry(id: number): Promise<void>;
  getCountry(id: number): Promise<Country>;
  getCountries(): Promise<Country[]>;
  getCountryByName(name: string): Promise<Country>;
}
