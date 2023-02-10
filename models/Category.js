

// Import important parts of the Sequelize library.
const { Model, DataTypes } = require('sequelize');
// Import the assignment database connection from the "config.js" file.
const sequelize = require('../config/connection');

// Initialize Category model (table) by extending off the Sequelize Model class.
class Category extends Model {}

// Set-up fields and rules for Category model.
Category.init(
  {
  id: {
    type: DataTypes.INTEGER, 
    allowNull: false, 
    primaryKey: true, 
    autoIncrement: true, 
    }, 
  category_name: {
    type: DataTypes.STRING, 
    allowNull: false, 
    }, 
  }, 
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);


// Export the Category model code for usage in other areas of the application.
module.exports = Category;


// "Category" model/table requirements:
//
// "id" field
// : Integer
// : Does not allow null values
// : Set as primary key
// : Uses auto increment
//
// "category_name" field
// : String
// : Does not allow null values

