import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '@angular-auth/libs/api/database';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
