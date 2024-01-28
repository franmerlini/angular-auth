import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { DeleteResult, UpdateResult } from 'typeorm';

import {
  Country,
  CountryDTO,
  UpdateCountryDTO,
} from '@angular-auth/libs/common';

import { CountryService } from '../../domain';
import { CountryDriverPort } from '../../ports';

@Controller('country')
export class CountryController {
  constructor(
    @Inject(CountryService)
    private readonly countryDriverPort: CountryDriverPort
  ) {}

  @Get(':id')
  getCountry(@Param('id') id: number): Promise<Country> {
    return this.countryDriverPort.getCountry(id);
  }

  @Get()
  getCountries(): Promise<Country[]> {
    return this.countryDriverPort.getCountries();
  }

  @Post()
  createCountry(@Body() body: CountryDTO): Promise<Country> {
    return this.countryDriverPort.createCountry(body);
  }

  @Put(':id')
  updateCountry(
    @Param('id') id: number,
    @Body() body: UpdateCountryDTO
  ): Promise<UpdateResult> {
    return this.countryDriverPort.updateCountry(id, body);
  }

  @Delete(':id')
  deleteCountry(@Param('id') id: number): Promise<DeleteResult> {
    return this.countryDriverPort.deleteCountry(id);
  }
}
