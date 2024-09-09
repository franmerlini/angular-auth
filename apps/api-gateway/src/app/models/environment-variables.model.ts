export type EnvironmentVariables = {
  // server
  NX_API_PREFIX: string;
  NX_SERVER_PROTOCOL: string;
  NX_SERVER_PORT: string;
  NX_SERVER_HOST: string;

  // microservices
  NX_AUTH_SERVICE_HOST: string;
  NX_AUTH_SERVICE_PORT: string;
  NX_USER_SERVICE_HOST: string;
  NX_USER_SERVICE_PORT: string;

  // jwt
  NX_JWT_SECRET: string;
  NX_JWT_EXPIRES_IN: string;

  // google
  NX_GOOGLE_CLIENT_ID: string;
  NX_GOOGLE_CLIENT_SECRET: string;
};
