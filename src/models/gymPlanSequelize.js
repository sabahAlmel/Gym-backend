import { DataTypes } from "sequelize";
import sequelize from "../config/sequelizeConnections.js";

const GymPlan = sequelize.define("GymPlan", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  feature: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default GymPlan;
