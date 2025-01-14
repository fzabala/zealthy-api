import { DataTypes, NOW, QueryInterface } from 'sequelize';

export = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('fields', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      component: DataTypes.STRING,
      defaultForStep: { type: DataTypes.STRING, allowNull: true },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: NOW,
      },
    });

    await queryInterface.bulkInsert('fields', [
      {
        component: 'about',
        defaultForStep: '2',
      },
      {
        component: 'birthDate',
        defaultForStep: '3',
      },
    ]);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('fields');
  },
};
