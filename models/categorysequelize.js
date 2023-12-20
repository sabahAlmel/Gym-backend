'use strict';
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class categorySequelize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     categorySequelize.hasMany(models.productModel, {as:"products", onDelete:"CASCADE"})
     categorySequelize.hasMany(models.regimeModel,  {onDelete:"CASCADE"})
    }
  }
  categorySequelize.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'categorySequelize',
  });
  return categorySequelize;
};