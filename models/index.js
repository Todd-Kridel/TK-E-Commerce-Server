

// Import the data models of the application.
const Category = require('./Category');
const Product = require('./Product');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');


//
// "Categories" data/table relationships:
//

// for the one-to-many relationship with the "Products" table
Category.hasMany(Product, {  // Categories have many Products.
  foreignKey: 'category_id'
});


//
// "Products" data/table relationships:
//

// for the many-to-many relationship with the "Category" table
Product.belongsTo(Category, {  // Products belongs to a Category.
  foreignKey: 'category_id', 
})

// for the many-to-many relationship with the "Tag" table
Product.belongsToMany(Tag, {  // Products belong to many Tags (through ProductTag).
  through: ProductTag,
  foreignKey: 'product_id'
});


//
// "Tag" data/table relationships:
//

// for the many-to-many relationship with the "Tag" table
Tag.belongsToMany(Product, {  // Tags belong to many Products (through ProductTag).
  through: ProductTag,
  foreignKey: 'tag_id'
});


// Export the data model associations for usage in other areas of the application.
module.exports = { Category, Product, Tag, ProductTag };


// Associations
//
// You'll need to execute association methods on your Sequelize models to create 
// the following relationships between them:
//
// Product belongs to Category, as a category can have multiple products but a 
// product can only belong to one category.
//
// Product belongs to many Tag models. Using the ProductTag through model, allow 
// products to have multiple tags and tags to have many products.
//
// Category has many Product models.
//
// Tag belongs to many Product models.

