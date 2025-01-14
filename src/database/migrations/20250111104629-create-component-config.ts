import { DataTypes, NOW, QueryInterface } from 'sequelize';

export = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('component-config', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      component: DataTypes.STRING,
      step: DataTypes.ENUM('2', '3'),
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
    await queryInterface.dropTable('component-config');
  },
};
