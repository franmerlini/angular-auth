import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, UpdateResult } from 'typeorm';

import { CreateCountryDto, UpdateCountryDto } from '@angular-auth/libs/api/shared';
import { Country } from '@angular-auth/libs/shared';

import { CountryEntity } from '../../domain';
import { CountryDrivenPort } from '../../ports';
import { CountryRepository } from './repositories';

@Injectable()
export class CountryDrivenAdapter implements CountryDrivenPort {
  constructor(@InjectRepository(CountryEntity) private readonly countryRepository: CountryRepository) {}

  createCountry(country: CreateCountryDto): Promise<Country> {
    return this.countryRepository.save(country);
  }

  updateCountry(id: number, country: UpdateCountryDto): Promise<UpdateResult> {
    return this.countryRepository.update(id, country);
  }

  deleteCountry(id: number): Promise<DeleteResult> {
    return this.countryRepository.delete(id);
  }

  getCountry(id: number): Promise<Country | null> {
    return this.countryRepository.findOne({
      where: { id },
    });
  }

  getCountries(): Promise<Country[]> {
    return this.countryRepository.find();
  }

  getCountryByName(name: string): Promise<Country | null> {
    return this.countryRepository.findOne({
      where: { name },
    });
  }
}
