'use strict';
import { Model } from "sequelize";
export default  (sequelize, DataTypes) => {
  class regime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      regime.belongsTo(models.categoriesModel,{onDelete:"CASCADE"})
    }
  }
  regime.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'regime',
  });
  return regime;
};