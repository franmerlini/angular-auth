export const appConfig = () => ({
  port: process.env.NX_PORT,
  apiProtocol: process.env.NX_API_PROTOCOL,
  apiHost: process.env.NX_API_HOST,
  apiPrefix: process.env.NX_API_PREFIX,
});

export const AppConfigKeys = {
  PORT: 'port',
  API_PROTOCOL: 'apiProtocol',
  API_HOST: 'apiHost',
  API_PREFIX: 'apiPrefix',
} as const;
