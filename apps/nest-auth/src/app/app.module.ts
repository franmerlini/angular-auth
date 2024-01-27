import { Module } from '@nestjs/common';

import { AuthModule } from '@angular-auth/libs/api/auth';
import { CoreModule } from '@angular-auth/libs/api/core';
import { UserModule } from '@angular-auth/libs/api/user';

@Module({
  imports: [CoreModule, AuthModule, UserModule],
})
export class AppModule {}
