export default () => ({
  port: 3000,
  db: {
    type: 'mysql' as const,
    host: 'localhost',
    port: 3306,
    username: 'devuser',
    password: 'devuser',
    database: 'mysql_auth',
  },
});
