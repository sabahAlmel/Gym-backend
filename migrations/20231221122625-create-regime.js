'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('regimes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        // allowNull: false,
        defaultValue:"../images/regime.png"
      },
      // categoryId:{
      //   type: Sequelize.INTEGER,
      //   allowNull:false,
      //   references:{
      //     model:"categories",
      //     key:'id'
      //   },
      //   onUpdate:'CASCADE',
      //   onDelete:'CASCADE'
      // },
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
    await queryInterface.dropTable('regimes');
  }
};