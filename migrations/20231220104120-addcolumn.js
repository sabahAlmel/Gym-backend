'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.addColumn("regimeSequelizes","categoryId",{
    type: Sequelize.INTEGER,
    allowNull:false,
    references:{
      model:"categorySequelizes",
      key:'id'
    },
    onUpdate:'CASCADE',
    onDelete:'CASCADE'
  })

  },

  async down (queryInterface, Sequelize) {
await queryInterface.removeColumn("regimeSequelizes","categoryId")
  }
};
