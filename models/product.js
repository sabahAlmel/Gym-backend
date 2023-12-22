'use strict';
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product.belongsTo(models.categoriesModel,{onDelete:"CASCADE"})
    }
  }
  product.init({
    prodName: DataTypes.STRING,
    prodPrice: DataTypes.INTEGER,
    prodImage: DataTypes.STRING,
    prodDescription: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};