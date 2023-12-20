'use strict';
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class productsSequelize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      productsSequelize.belongsTo(models.categoriesModel,{ onDelete:"CASCADE"})
    }
  }
  productsSequelize.init({
    prodName: DataTypes.STRING,
    prodPrice: DataTypes.INTEGER,
    prodImage: DataTypes.STRING,
    prodDescription: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'productsSequelize',
  });
  return productsSequelize;
};