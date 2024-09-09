import { ClassSerializerInterceptor, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';

import { HttpExceptionFilter, RpcExceptionFilter, validationPipe } from '@angular-auth/libs/api/shared';

import { AppModule, corsOptions, EnvironmentVariables } from './app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<EnvironmentVariables>);
  const reflector = app.get(Reflector);

  const apiPrefix = configService.get<string>('NX_API_PREFIX');
  const protocol = configService.get<string>('NX_SERVER_PROTOCOL');
  const host = configService.get<string>('NX_SERVER_HOST');
  const port = configService.get<string>('NX_SERVER_PORT');

  app.setGlobalPrefix(apiPrefix);
  app.enableCors(corsOptions);
  app.useGlobalPipes(validationPipe);
  app.useGlobalFilters(new HttpExceptionFilter(), new RpcExceptionFilter());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  await app.listen(port);

  Logger.log(`🚀 Application is running on: ${protocol}://${host}:${port}/${apiPrefix}`);
}

bootstrap();
