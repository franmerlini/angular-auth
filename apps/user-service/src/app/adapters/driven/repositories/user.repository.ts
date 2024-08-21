import { Injectable } from '@nestjs/common';

import { DataSource, Repository } from 'typeorm';

import { UserEntity } from '../../../domain';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }
}
