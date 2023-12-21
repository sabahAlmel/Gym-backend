"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "productsSequelizes",
      "categorySequelizeId",
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "categorySequelizes",
          key: "id",
          as: "categorySequelizeId",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("productsSequelizes", "categoryId");
  },
};
