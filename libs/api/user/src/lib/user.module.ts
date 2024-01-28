import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Country, User } from '@angular-auth/libs/common';

import {
  CountryController,
  CountryDrivenAdapter,
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
    UserDrivenAdapter,
    CountryDrivenAdapter,
  ],
  exports: [UserService, CountryService],
})
export class UserModule {}
