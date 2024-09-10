import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CreateCountryDto, UpdateCountryDto, UserClientPatternsEnum } from '@angular-auth/libs/api/shared';
import { Country } from '@angular-auth/libs/shared';

import { CountryService } from '../../domain';
import { CountryDriverPort } from '../../ports';

@Controller()
export class CountryController {
  constructor(@Inject(CountryService) private readonly countryDriverPort: CountryDriverPort) {}

  @MessagePattern(UserClientPatternsEnum.GET_COUNTRY)
  getCountry(@Payload() id: number): Promise<Country> {
    return this.countryDriverPort.getCountry(id);
  }

  @MessagePattern(UserClientPatternsEnum.GET_COUNTRIES)
  getCountries(): Promise<Country[]> {
    return this.countryDriverPort.getCountries();
  }

  @MessagePattern(UserClientPatternsEnum.CREATE_COUNTRY)
  createCountry(@Payload() createCountryDto: CreateCountryDto): Promise<Country> {
    return this.countryDriverPort.createCountry(createCountryDto);
  }

  @MessagePattern(UserClientPatternsEnum.UPDATE_COUNTRY)
  updateCountry(
    @Payload() { id, updateCountryDto }: { id: number; updateCountryDto: UpdateCountryDto },
  ): Promise<Country> {
    return this.countryDriverPort.updateCountry(id, updateCountryDto);
  }

  @MessagePattern(UserClientPatternsEnum.DELETE_COUNTRY)
  deleteCountry(@Payload() id: number): Promise<void> {
    return this.countryDriverPort.deleteCountry(id);
  }
}
