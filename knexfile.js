import * as Environment from "~/common/environment";

module.exports = {
  development: {
    client: "pg",
    connection: {
      ssl: true,
      port: Environment.POSTGRES_PORT,
      host: Environment.POSTGRES_HOSTNAME,
      database: Environment.POSTGRES_DATABASE,
      user: Environment.POSTGRES_ADMIN_USERNAME,
      password: Environment.POSTGRES_ADMIN_PASSWORD,
    },
  },
  production: {
    client: "pg",
    connection: {
      ssl: true,
      port: Environment.POSTGRES_PORT,
      host: Environment.POSTGRES_HOSTNAME,
      database: Environment.POSTGRES_DATABASE,
      user: Environment.POSTGRES_ADMIN_USERNAME,
      password: Environment.POSTGRES_ADMIN_PASSWORD,
    },
  },
};
