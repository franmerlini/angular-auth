import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, UpdateResult } from 'typeorm';

import {
  Country,
  CreateCountryDTO,
  UpdateCountryDTO,
} from '@angular-auth/libs/common';

import { CountryDrivenPort } from '../../ports';
import { CountryRepository } from './repositories';

export const COUNTRY_DRIVEN_ADAPTER_TOKEN = 'country-driven-adapter-token';

@Injectable()
export class CountryDrivenAdapter implements CountryDrivenPort {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: CountryRepository
  ) {}

  async createCountry(country: CreateCountryDTO): Promise<Country> {
    return await this.countryRepository.save(country);
  }

  async updateCountry(
    id: number,
    country: UpdateCountryDTO
  ): Promise<UpdateResult> {
    const repoCountry = await this.countryRepository.findOne({
      where: { id },
    });

    if (!repoCountry) {
      throw new Error('Country not found.');
    }

    return await this.countryRepository.update(id, country);
  }

  async deleteCountry(id: number): Promise<DeleteResult> {
    const repoCountry = await this.countryRepository.findOne({
      where: { id },
    });

    if (!repoCountry) {
      throw new Error('Country not found.');
    }

    return await this.countryRepository.delete(id);
  }

  async getCountry(id: number): Promise<Country> {
    const repoCountry = await this.countryRepository.findOne({
      where: { id },
    });

    if (!repoCountry) {
      throw new Error('Country not found.');
    }

    return repoCountry;
  }

  async getCountries(): Promise<Country[]> {
    return await this.countryRepository.find();
  }
}
