import type { Knex } from "knex";
import 'ts-node/register';
import dotenv from "dotenv";

dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      database: process.env.DBNAME,
      user: process.env.DBUSER,
      password: process.env.DBPASS
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "database/migrations"
    },
    seeds: {
      directory: "database/seeders"
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "database/migrations"
    },
    seeds: {
      directory: "database/seeders"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "database/migrations"
    },
    seeds: {
      directory: "database/seeders"
    }
  }

};

module.exports = config;
