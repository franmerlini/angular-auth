import { Module } from '@nestjs/common';

import { AuthModule } from '@angular-auth/libs/api/auth';
import { CoreModule } from '@angular-auth/libs/api/core';

@Module({
  imports: [CoreModule, AuthModule],
})
export class AppModule {}
