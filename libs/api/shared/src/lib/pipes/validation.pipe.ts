import { ValidationPipe } from '@nestjs/common';

export const validationPipe = new ValidationPipe({
  transformOptions: {
    enableImplicitConversion: true,
  },
});
