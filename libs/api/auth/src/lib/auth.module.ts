import { Module } from '@nestjs/common';

import { UserModule } from '@angular-auth/libs/api/user';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  imports: [UserModule],
  providers: [AuthService],
  exports: [],
})
export class AuthModule {}
