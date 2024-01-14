import { Module } from '@nestjs/common';

import { DatabaseModule } from '@angular-auth/libs/api/database';

@Module({
  imports: [DatabaseModule],
})
export class CoreModule {}
