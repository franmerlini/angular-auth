import { Injectable } from '@nestjs/common';

import { DataSource, Repository } from 'typeorm';

import { CountryEntity } from '../../../domain';

@Injectable()
export class CountryRepository extends Repository<CountryEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CountryEntity, dataSource.createEntityManager());
  }
}
