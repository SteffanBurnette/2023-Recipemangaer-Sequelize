'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recipe_api extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  recipe_api.init({
    title: DataTypes.STRING,
    ingredients: DataTypes.TEXT,
    description: DataTypes.TEXT,
    instructions: DataTypes.TEXT,
    created_at: {type:DataTypes.DATE,  },
    updated_at: {type:DataTypes.DATE,
      validate: {
        isDate: true,
        isPast(value) {
          if (value && value < this.created_at) {
            throw new "Update Date cannot be in the past, before the recipe was created."();
          }
        },
    },
    }  }, {
    sequelize,
    modelName: 'recipe_api',
    tableName: 'recipe_api',// explicit snake cased table name
    underscored: true // this option converts camelCased columns to snake_case in the DB

  });
  return recipe_api;
};