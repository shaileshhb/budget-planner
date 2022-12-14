'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        allowNull: false,
        // defaultValue: Sequelize.UUIDV4,
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
        allowNull: false,
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          is: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W\_]){1,})(?!.*\s).{8,20}$/
        },
      },
      dateOfBirth: {
        type: Sequelize.STRING
      },
      contact: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      profileImage: {
        type: Sequelize.STRING
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }
    });

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};