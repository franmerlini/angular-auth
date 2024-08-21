import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';

import { Public } from '@angular-auth/libs/api/shared';
import { Country } from '@angular-auth/libs/common';

import { CountryService, CreateCountryDTO, UpdateCountryDTO } from '../../domain';
import { CountryDriverPort } from '../../ports';

@Controller('country')
export class CountryController {
  constructor(@Inject(CountryService) private readonly countryDriverPort: CountryDriverPort) {}

  @Get(':id')
  getCountry(@Param('id') id: number): Promise<Country> {
    return this.countryDriverPort.getCountry(id);
  }

  @Public()
  @Get()
  getCountries(): Promise<Country[]> {
    return this.countryDriverPort.getCountries();
  }

  @Post()
  createCountry(@Body() body: CreateCountryDTO): Promise<Country> {
    return this.countryDriverPort.createCountry(body);
  }

  @Put(':id')
  updateCountry(@Param('id') id: number, @Body() body: UpdateCountryDTO): Promise<Country> {
    return this.countryDriverPort.updateCountry(id, body);
  }

  @Delete(':id')
  deleteCountry(@Param('id') id: number): Promise<void> {
    return this.countryDriverPort.deleteCountry(id);
  }
}
