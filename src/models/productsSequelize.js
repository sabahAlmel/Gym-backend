import { DataTypes } from "sequelize";
import sequelize from "../config/sequelizeConnections.js";

const Product = sequelize.define("Product", {
  prodName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prodPrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  prodImage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prodDescription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Product;
