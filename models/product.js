'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.product.belongsToMany(models.user, {through: 'cart'})
      // define association here
    }
  };
  product.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.TEXT,
    price: DataTypes.DECIMAL(10,2)
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};