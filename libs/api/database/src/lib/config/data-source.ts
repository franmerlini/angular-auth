import { join } from 'path';

import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import configuration from './configuration';

const {
  db: { type, host, port, username, password, database },
} = configuration();

export const dataSourceOptions: DataSourceOptions = {
  type,
  host,
  port,
  username,
  password,
  database,
  entities: [
    `${join(process.cwd(), 'src', 'lib', 'entities')}/*.entity{.ts,.js}`,
  ],
  migrations: [`${process.cwd()}/migrations/*{.ts,.js}`],
  synchronize: true,
  migrationsRun: true,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
};

export const dataSource = new DataSource(dataSourceOptions);