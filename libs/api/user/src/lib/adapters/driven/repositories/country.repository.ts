import { Injectable } from '@nestjs/common';

import { DataSource, Repository } from 'typeorm';

import { Country } from '@angular-auth/libs/common';

@Injectable()
export class CountryRepository extends Repository<Country> {
  constructor(private readonly dataSource: DataSource) {
    super(Country, dataSource.createEntityManager());
  }
}
