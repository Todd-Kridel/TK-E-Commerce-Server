

// Import important parts of the Sequelize library.
const { Model, DataTypes } = require('sequelize');
// Import the assignment database connection from the "config.js" file.
const sequelize = require('../config/connection');

// Initialize ProductTag model (table) by extending off the Sequelize Model class.
class ProductTag extends Model {}

// Set-up fields and rules for ProductTag model.
ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    }, 
    product_id:{
      type: DataTypes.INTEGER,
      references: {
          model: 'product',
          key: 'id',
      }, 
    }, 
    tag_id:{
      type: DataTypes.INTEGER,
      references: {
          model: 'tag',
          key: 'id',
      }, 
    }, 
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);


// Export the ProductTag model code for usage in other areas of the application.
module.exports = ProductTag;


// "ProductTag" model/table requirements:
//
// "id" field
// : Integer
// : Does not allow null values
// : Set as primary key
// : Uses auto increment
//
// "product_id" field
// : Integer
// : References the product model id
//
// "tag_id" field
// : Integer
// : References the tag model id

