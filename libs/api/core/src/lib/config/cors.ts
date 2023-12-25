import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export default (): CorsOptions => ({
  origin: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true,
});
