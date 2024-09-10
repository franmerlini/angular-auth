import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CountryController, CountryDrivenAdapter, UserController, UserDrivenAdapter } from './adapters';
import { dataSourceOptions } from './data-source';
import { CountryEntity, CountryService, TokenEnum, UserEntity, UserService } from './domain';

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
      provide: TokenEnum.UserDrivenAdapterToken,
      useClass: UserDrivenAdapter,
    },
    CountryService,
    {
      provide: TokenEnum.CountryDrivenAdapterToken,
      useClass: CountryDrivenAdapter,
    },
  ],
})
export class AppModule {}
