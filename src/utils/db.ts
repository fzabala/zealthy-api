import fs from 'fs';
import { Sequelize } from 'sequelize';
import { logger } from './logger';

export const runMigrations = async (sequelize: Sequelize) => {
  const migrationsPath = `${__dirname}/../database/migrations/`;
  const migrations = fs.readdirSync(migrationsPath);
  for (const m of migrations) {
    const migration = await import(`${migrationsPath}${m}`);
    logger.info(`Migrating [${m}]`);
    await migration.up(sequelize.getQueryInterface());
  }
};

logger.info(`Migrations done!`);
