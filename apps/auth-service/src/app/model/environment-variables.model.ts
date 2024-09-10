export type EnvironmentVariables = {
  // server
  NX_SERVER_PORT: string;
  NX_SERVER_HOST: string;

  // user-service
  NX_USER_SERVICE_HOST: string;
  NX_USER_SERVICE_PORT: string;

  // jwt
  NX_JWT_SECRET: string;
  NX_JWT_TOKEN_EXPIRES_IN: string;
  NX_JWT_REFRESH_EXPIRES_IN: string;
};
