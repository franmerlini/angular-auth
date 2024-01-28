export const securityConfig = () => ({
  hashSalt: 10,
});

export const SecurityConfigKeys = {
  HASH_SALT: 'hashSalt',
} as const;
