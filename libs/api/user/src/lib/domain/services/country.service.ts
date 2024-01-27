import { Inject, Injectable } from '@nestjs/common';

import { DeleteResult, UpdateResult } from 'typeorm';

import { Country } from '@angular-auth/libs/common';

import { COUNTRY_DRIVEN_ADAPTER_TOKEN } from '../../adapters';
import { CountryDrivenPort, CountryDriverPort } from '../../ports';

@Injectable()
export class CountryService implements CountryDriverPort {
  constructor(
    @Inject(COUNTRY_DRIVEN_ADAPTER_TOKEN)
    private readonly countryDrivenPort: CountryDrivenPort
  ) {}

  createCountry(country: Country): Promise<Country> {
    return this.countryDrivenPort.createCountry(country);
  }

  updateCountry(id: number, country: Country): Promise<UpdateResult> {
    return this.countryDrivenPort.updateCountry(id, country);
  }

  deleteCountry(id: number): Promise<DeleteResult> {
    return this.countryDrivenPort.deleteCountry(id);
  }

  getCountry(id: number): Promise<Country> {
    return this.countryDrivenPort.getCountry(id);
  }

  getCountries(): Promise<Country[]> {
    return this.countryDrivenPort.getCountries();
  }
}
