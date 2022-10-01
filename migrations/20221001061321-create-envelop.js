'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('envelops', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING
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
    });

    await queryInterface.addConstraint('envelops', {
      type: 'FOREIGN KEY',
      name: 'envelops_userId_users_id_foreign',
      fields: ['userId'],
      references: { //Required field
        table: 'users',
        field: 'id'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('envelops');
  }
};