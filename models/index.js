'use strict';
import fs from "fs"
import path from "path"
import {Sequelize} from'sequelize';
import process from'process';
import gymplansequelize from "./gymplansequelize.js";
import categorysequelize from "./categorysequelize.js";
import productssequelize from "./productssequelize.js";
import regimesequelize from "./regimesequelize.js";
import trainingsequelize from "./trainingsequelize.js";
import usersequelize from "./usersequelize.js";
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

const gymPlanModel=gymplansequelize(sequelize,Sequelize)
const categoriesModel=categorysequelize(sequelize,Sequelize)
const productModel=productssequelize(sequelize,Sequelize)
const regimeModel=regimesequelize(sequelize,Sequelize)
const trainingModel=trainingsequelize(sequelize,Sequelize)
const userModel=usersequelize(sequelize,Sequelize)

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
