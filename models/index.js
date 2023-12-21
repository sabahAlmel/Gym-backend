'use strict';
import fs from "fs"
import path from "path"
import {Sequelize} from'sequelize';
import process from'process';
import gymplan from "./gymplan.js";
import category from "./category.js";
import product from "./product.js";
import regime from "./regime.js";
import training from "./training.js";
import user from "./user.js";
// const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// import config from(__dirname + '/../config/config.json')[env];
import dotenv from "dotenv"
dotenv.config()

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
      host: process.env.DB_HOST,
      dialect: 'mysql'
  }
);

const gymPlanModel=gymplan(sequelize,Sequelize)
const categoriesModel=category(sequelize,Sequelize)
const productModel=product(sequelize,Sequelize)
const regimeModel=regime(sequelize,Sequelize)
const trainingModel=training(sequelize,Sequelize)
const userModel=user(sequelize,Sequelize)

const db={
  sequelize,
  Sequelize,
  gymPlanModel,
  categoriesModel,
  productModel,
  regimeModel,
  trainingModel,
  userModel
}
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
    // console.log("");
    // console.log(iter++);
  }

});


export default db
