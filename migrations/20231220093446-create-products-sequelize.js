'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('productsSequelizes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      prodName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      prodPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      prodImage: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      prodDescription: {
        type: Sequelize.STRING,
        allowNull: false,
      },
   
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('productsSequelizes');
  }
};