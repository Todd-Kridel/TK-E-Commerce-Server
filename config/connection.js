

// Load the system component that allows for database authentication information to be stored in a non-Git-upload external import file.
require('dotenv').config();

const Sequelize = require('sequelize');

// Establish the database connection by importing the externally-stored database authentication information.
let sequelize;
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: '127.0.0.1',  // localhost
      dialect: 'mysql',
      port: 3306
    }
  );
}


// const sequelize = process.env.JAWSDB_URL
//   ? new Sequelize(process.env.JAWSDB_URL)
//   : new Sequelize(process.env.DB_NAME, process.env.DB_PW, process.env.DB_USER, {
//       host: 'localhost',
//       dialect: 'mysql',
//       dialectOptions: {
//         decimalNumbers: true,
//       },
//     });


// Export the Sequelize connection code for usage in other areas of the application.
module.exports = sequelize;

