'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports= {
  async up (queryInterface, Sequelize) {
  await queryInterface.removeColumn(
    "regimes",
    "categoryId"
  )

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn( "regimes", "categoryId",{
      type: Sequelize.INTEGER,
      allowNull:false,
      references:{
        model:"categories",
        key:'id'
      },
      onUpdate:'CASCADE',
      onDelete:'CASCADE'
    })
  }
};
