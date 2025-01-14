import { DataTypes, NOW, QueryInterface } from 'sequelize';
import { STEPS } from '../../constants/steps.constant';

export = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: DataTypes.STRING,
      about: DataTypes.STRING,
      street: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zip: DataTypes.STRING,
      birthDate: DataTypes.DATEONLY,
      progress: DataTypes.ENUM(STEPS['STEP-2'], STEPS['STEP-3'], STEPS.DONE),
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: NOW,
      },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('users');
  },
};
