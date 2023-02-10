

// Import important parts of the Sequelize library.
const { Model, DataTypes } = require('sequelize');
// Import the assignment database connection from the "config.js" file.
const sequelize = require('../config/connection');

// Initialize Tag model (table) by extending off the Sequelize Model class.
class Tag extends Model {}

// Set-up fields and rules for Tag model.
Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tag_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);


// Export the Tag model code for usage in other areas of the application.
module.exports = Tag;


// Tag model/table requirements:
//
// "id" field
// : Integer
// : Does not allow null values
// : Set as primary key
// : Uses auto increment
//
// "tag_name" field
// : String

