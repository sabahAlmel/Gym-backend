'use strict';
import { Model } from "sequelize";
export default  (sequelize, DataTypes) => {
  class regimeSequelize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      regimeSequelize.belongsTo(models.regimeModel,{ onDelete:"CASCADE"})
    }
  }
  regimeSequelize.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'regimeSequelize',
  });
  return regimeSequelize;
};