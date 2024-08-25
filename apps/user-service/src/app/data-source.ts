import { DataSource, DataSourceOptions } from 'typeorm';

import { CountryEntity, UserEntity } from './domain';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.NX_DB_HOST,
  port: parseInt(process.env.NX_DB_PORT),
  username: process.env.NX_DB_USERNAME,
  password: process.env.NX_DB_PASSWORD,
  database: process.env.NX_DB_NAME,
  entities: [CountryEntity, UserEntity],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
};

export const dataSource = new DataSource(dataSourceOptions);
