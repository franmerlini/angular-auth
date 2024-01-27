import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UpdateResult } from 'typeorm';

import { Country, CreateCountryDTO } from '@angular-auth/libs/common';

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
    try {
      return await this.countryRepository.save(country);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async updateCountry(id: number, country: Country): Promise<UpdateResult> {
    try {
      const repoCountry = await this.countryRepository.findOne({
        where: { id },
      });

      if (!repoCountry) {
        throw new Error('Country not found.');
      }

      return await this.countryRepository.update(id, country);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async deleteCountry(id: number): Promise<void> {
    try {
      const repoCountry = await this.countryRepository.findOne({
        where: { id },
      });

      if (!repoCountry) {
        throw new Error('Country not found.');
      }

      await this.countryRepository.delete(id);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async getCountry(id: number): Promise<Country> {
    try {
      const repoCountry = await this.countryRepository.findOne({
        where: { id },
      });

      if (!repoCountry) {
        throw new Error('Country not found.');
      }

      return repoCountry;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async getCountries(): Promise<Country[]> {
    try {
      return await this.countryRepository.find();
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
