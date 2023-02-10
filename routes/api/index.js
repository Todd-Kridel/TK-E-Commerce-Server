

// Define/Require/Import necessary route specifications and the corresponding code-definition files.
const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');

// Implement/Activate the required route middleware systems.
router.use('/category', categoryRoutes);
router.use('/product', productRoutes);
router.use('/tag', tagRoutes);

// Export the Router system code for usage in other areas of the application.
module.exports = router;

