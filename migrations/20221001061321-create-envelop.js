'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('envelops', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amount: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      salaryId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "usersalaries",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
    });

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('envelops');
  }
};