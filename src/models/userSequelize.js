import { DataTypes } from "sequelize";
import sequelize from "../config/sequelizeConnections.js";

const Users = sequelize.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "visitor",
  },
  image: {
    type: DataTypes.STRING,
  },
});
await Users.sync();
export default Users;
