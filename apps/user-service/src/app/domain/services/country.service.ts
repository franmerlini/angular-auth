import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';

import { CreateCountryDto, UpdateCountryDto } from '@angular-auth/libs/api/shared';
import { Country } from '@angular-auth/libs/shared';

import { CountryDrivenPort, CountryDriverPort } from '../../ports';
import { TokenEnum } from '../enums';

@Injectable()
export class CountryService implements CountryDriverPort {
  constructor(@Inject(TokenEnum.CountryDrivenAdapterToken) private readonly countryDrivenPort: CountryDrivenPort) {}

  async createCountry(country: CreateCountryDto): Promise<Country> {
    const { name } = country;

    const existsCountry = await this.countryDrivenPort.getCountryByName(name);

    if (existsCountry) {
      throw new ConflictException(`Country '${name}' already exists.`);
    }

    return this.countryDrivenPort.createCountry(country);
  }

  async updateCountry(id: number, country: UpdateCountryDto): Promise<Country> {
    const { affected } = await this.countryDrivenPort.updateCountry(id, country);

    if (affected === 0) {
      throw new NotFoundException(`Country with ID ${id} doesn't exist.`);
    }

    return this.countryDrivenPort.getCountry(id) as Promise<Country>;
  }

  async deleteCountry(id: number): Promise<void> {
    const existsCountry = await this.countryDrivenPort.getCountry(id);

    if (!existsCountry) {
      throw new NotFoundException(`Country with ID ${id} doesn't exist.`);
    }

    this.countryDrivenPort.deleteCountry(id);
  }

  async getCountry(id: number): Promise<Country> {
    const country = await this.countryDrivenPort.getCountry(id);

    if (!country) {
      throw new NotFoundException(`Country with ID ${id} doesn't exist.`);
    }

    return country;
  }

  async getCountries(): Promise<Country[]> {
    const countries = await this.countryDrivenPort.getCountries();

    if (countries.length === 0) {
      throw new NotFoundException(`No countries found.`);
    }

    return countries;
  }

  async getCountryByName(name: string): Promise<Country> {
    const country = await this.countryDrivenPort.getCountryByName(name);

    if (!country) {
      throw new NotFoundException(`Country '${name}' doesn't exist.`);
    }

    return country;
  }
}
