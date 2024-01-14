import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CountryEntity, UserEntity } from '@angular-auth/libs/api/database';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([UserEntity, CountryEntity])],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
