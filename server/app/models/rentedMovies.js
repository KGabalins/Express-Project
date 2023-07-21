const { DataTypes } = require("sequelize");
const db = require("../config/postgres");

const RentedMovie = db.define("rentedmovie", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.NUMBER,
    allowNull: false,
    defaultValue: 12,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  renter: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = {
  RentedMovie,
};
