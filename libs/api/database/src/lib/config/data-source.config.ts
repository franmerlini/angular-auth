import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { CountryEntity, UserEntity } from '../entities';
import { databaseConfig } from './database.config';

const {
  db: { type, host, port, username, password, database },
} = databaseConfig();

export const dataSourceOptions: DataSourceOptions = {
  type,
  host,
  port,
  username,
  password,
  database,
  // entities: [__dirname + '/lib/entities/**/*.entity{.ts,.js}'],
  entities: [UserEntity, CountryEntity],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: true,
  migrationsRun: true,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
};

export const dataSource = new DataSource(dataSourceOptions);
