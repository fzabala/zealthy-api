import dotenv from 'dotenv';
dotenv.config({
  path: `.env${
    process.env.NODE_ENV === 'development' ? '' : '.' + process.env.NODE_ENV
  }`,
});

module.exports = {
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: process.env.DB_DIALECT,
    storage: process.env.DB_STORAGE,
  },
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: process.env.DB_DIALECT,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: process.env.DB_DIALECT,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
