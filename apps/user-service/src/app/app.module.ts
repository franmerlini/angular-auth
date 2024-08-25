import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CountryController, CountryDrivenAdapter, UserController, UserDrivenAdapter } from './adapters';
import { dataSourceOptions } from './data-source';
import { CountryEntity, CountryService, UserEntity, UserService } from './domain';

@Module({
  controllers: [UserController, CountryController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([UserEntity, CountryEntity]),
  ],
  providers: [
    UserService,
    {
      provide: 'foo',
      useClass: UserDrivenAdapter,
    },
    CountryService,
    {
      provide: 'foo1',
      useClass: CountryDrivenAdapter,
    },
  ],
})
export class AppModule {}
