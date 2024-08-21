import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.NX_DB_HOST,
  port: parseInt(process.env.NX_DB_PORT),
  username: process.env.NX_DB_USERNAME,
  password: process.env.NX_DB_PASSWORD,
  database: process.env.NX_DB_NAME,
  entities: [__dirname + '/../../../domain/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../../../../migrations/*{.ts,.js}'],
  synchronize: true,
  migrationsRun: true,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
};

export const dataSource = new DataSource(dataSourceOptions);
