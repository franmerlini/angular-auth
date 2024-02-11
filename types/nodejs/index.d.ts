declare namespace NodeJS {
  interface ProcessEnv {
    NX_PORT: string;
    NX_API_PROTOCOL: string;
    NX_API_HOST: string;
    NX_API_PREFIX: string;

    NX_DB_HOST: string;
    NX_DB_PORT: string;
    NX_DB_USERNAME: string;
    NX_DB_PASSWORD: string;
    NX_DB_NAME: string;

    NX_JWT_SECRET: string;

    NX_HASH_SALT: string;

    NX_GOOGLE_CLIENT_ID: string;
    NX_GOOGLE_CLIENT_SECRET: string;
  }
}
