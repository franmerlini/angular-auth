export const securityConfig = () => ({
  hashSalt: process.env['NX_HASH_SALT'],
  jwtSecret: process.env['NX_JWT_SECRET'],
});

export const SecurityConfigKeys = {
  HASH_SALT: 'hashSalt',
  JWT_SECRET: 'jwtSecret',
} as const;
