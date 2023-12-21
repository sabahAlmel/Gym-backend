'use strict';
import { Model } from "sequelize";
import product from "./product.js";
export default (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     category.hasMany(models.productModel, {as:"products", onDelete:"CASCADE"})
     category.hasMany(models.regimeModel, {onDelete:"CASCADE"})
    }
  }
  category.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'category',
  });
  return category;
};