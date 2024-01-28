export const securityConfig = () => ({
  hashSalt: 10,
  jwtSecret: 'secret',
});

export const SecurityConfigKeys = {
  HASH_SALT: 'hashSalt',
  JWT_SECRET: 'jwtSecret',
} as const;
