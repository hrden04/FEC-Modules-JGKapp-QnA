require('dotenv').config();

const env = process.env.NODE_ENV; // 'dev' or 'prod'

const dev = {
  app: {
    port: parseInt(process.env.DEV_APP_PORT, 10) || 4500,
  },
  db: {
    host: process.env.DEV_DB_HOST || 'localhost',
    port: parseInt(process.env.DEV_DB_PORT, 10) || 5432,
    database: process.env.DEV_DB_NAME || 'qna_db',
    user: process.env.USER,
    password: null,
  },
};

const prod = {
  app: {
    port: parseInt(process.env.PROD_APP_PORT, 10) || 4500,
  },
  db: {
    host: process.env.PROD_DB_HOST || 'database',
    port: parseInt(process.env.PROD_DB_PORT, 10) || 5432,
    database: process.env.PROD_DB_NAME || 'qna_db',
    user: process.env.PGUSER || 'postgres',
    password: process.env.PG_AWS_PASSWORD || 'postgres',
  },
};

const config = {
  dev,
  prod,
};

module.exports = config[env];
