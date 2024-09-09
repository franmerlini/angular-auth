import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';

import { MicroservicesEnum } from '@angular-auth/libs/api/shared';

import { AuthController } from './controllers';
import { JwtAuthGuard } from './guards';
import { EnvironmentVariables } from './models';
import { GoogleStrategy, JwtStrategy } from './strategies';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        secret: configService.get('NX_JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('NX_JWT_EXPIRES_IN'),
        },
      }),
    }),
    ClientsModule.registerAsync([
      {
        inject: [ConfigService],
        name: MicroservicesEnum.AUTH_SERVICE,
        useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('NX_AUTH_SERVICE_HOST'),
            port: configService.get('NX_AUTH_SERVICE_PORT'),
          },
        }),
      },
      {
        inject: [ConfigService],
        name: MicroservicesEnum.USER_SERVICE,
        useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('NX_USER_SERVICE_HOST'),
            port: configService.get('NX_USER_SERVICE_PORT'),
          },
        }),
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    GoogleStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
