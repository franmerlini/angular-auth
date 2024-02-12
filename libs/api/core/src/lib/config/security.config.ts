export const securityConfig = () => ({
  hashSalt: +process.env.NX_HASH_SALT,
  jwtSecret: process.env.NX_JWT_SECRET,
  googleClientId: process.env.NX_GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.NX_GOOGLE_CLIENT_SECRET,
});

export const SecurityConfigKeys = {
  HASH_SALT: 'hashSalt',
  JWT_SECRET: 'jwtSecret',
  GOOGLE_CLIENT_ID: 'googleClientId',
  GOOGLE_CLIENT_SECRET: 'googleClientSecret',
} as const;
