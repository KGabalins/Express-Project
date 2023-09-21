import { Sequelize } from "sequelize";
// require("dotenv").config();
import dotenv from "dotenv"
dotenv.config()
// require("dotenv").config({path: "../../.env"});


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

// module.exports = db;
export default db;