const { Sequelize } = require("sequelize");
// require("dotenv").config({path: "../../.env"});
require("dotenv").config();

console.log(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, process.env.PGHOST)

const db = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    dialect: "postgres",

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      timestamps: false
    }
  }
);

module.exports = db;
