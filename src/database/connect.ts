import { ComponentConfigModel, FieldModel, UserModel } from '@/models';
import { logger, runMigrations } from '@/utils';
import { Dialect, Transaction } from 'sequelize';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

let sequelize: Sequelize;

export async function connect(): Promise<Sequelize> {
  try {
    logger.info('Starting database connection...', process.env.DB_NAME);

    logger.info(process.env.DB_HOSTNAME);

    const options: SequelizeOptions = {
      dialect: process.env.DB_DIALECT as Dialect,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOSTNAME,
      storage: process.env.DB_STORAGE,
      port: Number(process.env.DB_PORT),
      logging: false,
      omitNull: false,
      models: [ComponentConfigModel, FieldModel, UserModel],
      logQueryParameters: true,
    };

    sequelize = new Sequelize(options);

    await sequelize.authenticate();

    logger.info('Connection success!', process.env.DB_NAME);

    if (process.env.NODE_ENV === 'test') {
      await sequelize.sync({ force: true });
      await runMigrations(sequelize);
    }

    return Promise.resolve(sequelize);
  } catch (e) {
    logger.error(new Error('Unable to connect to the database'));
    return Promise.reject({
      message: 'Unable to connect to the database',
      stack: (e as Error).stack,
    });
  }
}

export async function transaction(): Promise<Transaction> {
  return sequelize.transaction();
}

export async function close(): Promise<void> {
  logger.info('Closing database connection...');
  return sequelize.close();
}
