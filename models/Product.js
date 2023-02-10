

// Import important parts of the Sequelize library.
const { Model, DataTypes } = require('sequelize');
// Import the assignment database connection from the "config.js" file.
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off the Sequelize Model class.
class Product extends Model {}

// Set-up fields and rules for Product model.
Product.init(
  {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    },
  product_name: {
    type: DataTypes.STRING,
    allowNull: false,
    },
  price: {
    type: DataTypes.DECIMAL(10, 2), 
    allowNull: false, 
    validate: {isDecimal: true} , 
    }, 
  stock: {
    type: DataTypes.INTEGER, 
    allowNull: false, 
    default: 10, 
    validate: {isNumeric: true}, 
    }, 
  category_id: {
    type: DataTypes.INTEGER,
    references: {
        model: 'category',
        key: 'id'
      }, 
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);


// Export the Product model code for usage in other areas of the application.
module.exports = Product;


// "Product" model/table requirements:
//
// "id" field
// : Integer
// : Does not allow null values
// : Set as primary key
// : Uses auto increment
//
// "product_name" field
// : String
// : Does not allow null values
//
// "price" field
// : Decimal
// : Does not allow null values
// : Validates that the value is a decimal
// 
// "stock" field
// : Integer
// : Does not allow null values
// : Set a default value of 10
// : Validates that the value is numeric
//
// "category_id" field
// : Integer
// : References the category model id

