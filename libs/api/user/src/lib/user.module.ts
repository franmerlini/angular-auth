import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Country, User } from '@angular-auth/libs/common';

import {
  COUNTRY_DRIVEN_ADAPTER_TOKEN,
  CountryController,
  CountryDrivenAdapter,
  USER_DRIVEN_ADAPTER_TOKEN,
  UserController,
  UserDrivenAdapter,
} from './adapters';
import { CountryService, UserService } from './domain';

@Module({
  controllers: [UserController, CountryController],
  imports: [TypeOrmModule.forFeature([Country, User])],
  providers: [
    UserService,
    CountryService,
    {
      provide: USER_DRIVEN_ADAPTER_TOKEN,
      useFactory: (userDrivenAdapter: UserDrivenAdapter) => {
        return new UserService(userDrivenAdapter);
      },
      inject: [UserDrivenAdapter],
    },
    UserDrivenAdapter,
    {
      provide: COUNTRY_DRIVEN_ADAPTER_TOKEN,
      useFactory: (countryDrivenAdapter: CountryDrivenAdapter) => {
        return new CountryService(countryDrivenAdapter);
      },
      inject: [CountryDrivenAdapter],
    },
    CountryDrivenAdapter,
  ],
  exports: [UserService, CountryService],
})
export class UserModule {}
