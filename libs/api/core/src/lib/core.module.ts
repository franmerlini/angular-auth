import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import {
  DatabaseModule,
  databaseConfig,
} from '@angular-auth/libs/api/database';

import { appConfig } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
    }),
    DatabaseModule,
  ],
})
export class CoreModule {}
