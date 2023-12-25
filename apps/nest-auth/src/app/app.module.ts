import { Module } from '@nestjs/common';

import { AuthModule } from '@angular-auth/libs/api/auth';

@Module({
  imports: [AuthModule],
})
export class AppModule {}
