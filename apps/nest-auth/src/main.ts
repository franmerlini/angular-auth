import { ClassSerializerInterceptor, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';

import {
  AppConfigKeys,
  HttpExceptionFilter,
  cors,
  validationPipe,
} from '@angular-auth/libs/api/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const apiPrefix = app.get(ConfigService).get(AppConfigKeys.API_PREFIX);
  const protocol = app.get(ConfigService).get(AppConfigKeys.API_PROTOCOL);
  const host = app.get(ConfigService).get(AppConfigKeys.API_HOST);
  const port = app.get(ConfigService).get(AppConfigKeys.PORT);
  const reflector = app.get(Reflector);

  app.setGlobalPrefix(apiPrefix);
  app.enableCors(cors);
  app.useGlobalPipes(validationPipe);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: ${protocol}://${host}:${port}/${apiPrefix}`
  );
}

bootstrap();
