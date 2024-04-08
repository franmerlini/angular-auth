export const databaseConfig = () => ({
  db: {
    type: 'mysql' as const,
    host: process.env['NX_DB_HOST'],
    port: Number(process.env['NX_DB_PORT']),
    username: process.env['NX_DB_USERNAME'],
    password: process.env['NX_DB_PASSWORD'],
    database: process.env['NX_DB_NAME'],
  },
});
