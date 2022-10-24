'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('spendings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      envelopId: {
        type: Sequelize.UUID,
        allowNull: false,
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

    await queryInterface.addConstraint('spendings', {
      type: 'FOREiGN KEY',
      name: 'spendings_userId_users_id_foreign',
      fields: ['userId'],
      references: {
        table: 'users',
        field: "id"
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
    
    await queryInterface.addConstraint('spendings', {
      type: 'FOREiGN KEY',
      name: 'spendings_envelopId_envelops_id_foreign',
      fields: ['envelopId'],
      references: {
        table: 'envelops',
        field: "id"
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('spendings');
  }
};