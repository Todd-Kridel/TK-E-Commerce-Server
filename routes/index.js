

// Establish the import of the Router system components that allow for multiple URL route-definition files.
const router = require('express').Router();
const apiRoutes = require('./api');

// Implement/Activate the route API middleware systems.
router.use('/api', apiRoutes);
router.use('/', (req, res) => {  // fallback route to catch URL entries that are not covered by a function-specific process of the application
//router.use((req, res) => {
res.send("<h1>A non-correct route URL was used.</h1>")
});


// Export the Router system code for usage in other areas of the application.
module.exports = router;


// Fill out the API routes to perform RESTful CRUD operations.
// Fill out the un-finished routes in product-routes.js, tag-routes.js, and category-routes.js
// to perform create, read, update, and delete operations using your Sequelize models.


// possible "controllers\index.js" file:
//
// const router = require('express').Router();
// const homeRoutes = require('./homeRoutes');
// const apiRoutes = require('./api');
// router.use('/', homeRoutes);
// router.use('/api', apiRoutes);
// module.exports = router;

