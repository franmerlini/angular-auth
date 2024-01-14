import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const cors: CorsOptions = {
  origin: '*',
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true,
  allowedHeaders: 'Content-Type, Authorization',
};
