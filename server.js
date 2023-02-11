

// Import the server connection software/module.
//const Sequelize = require('sequelize');
const sequelize = require("./config/connection");
const express = require('express');
const routes = require('./routes');

// Import the sequelize connection and activate the required port for that connection.
const app = express();
const PORT = process.env.PORT || 3001;

// Activate the server middleware process.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

// Sync the sequelize models to the database and then turn-on the server on the readied port.
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {console.log(`App listening on port ${PORT}!`);})
});


// Seed the Database
// After creating the models and routes, run npm run seed to seed data to your 
// database so that you can test your routes.
// Sync Sequelize to the Database on Server Start
// Create the code needed in server.js to sync the Sequelize models to the MySQL 
// database on server start.

// You’ll need to use the MySQL2 Links to an external site.and Sequelize Links to 
// an external site.packages to connect your Express.js API to a MySQL database 
// and the dotenv package Links to an external site.to use environment variables 
// to store sensitive data, like your MySQL username, password, and database name.

// Use the schema.sql file in the db folder to create your database using MySQL 
// shell commands. Use environment variables to store sensitive data, like your 
// MySQL username, password, and database name.

