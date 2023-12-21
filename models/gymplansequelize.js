'use strict';
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class gymPlanSequelize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  gymPlanSequelize.init({
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    feature: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'gymPlanSequelize',
  });
  return gymPlanSequelize;
};