'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('spendings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
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
      envelopId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "envelops",
          key: "id"
        },
        onUpdate: "RESTRICT",
        onDelete: "RESTRICT"
      },
      payee: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amount: {
        type: Sequelize.DECIMAL
      },
      spendingType: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
    });

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('spendings');
  }
};

