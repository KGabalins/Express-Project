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

// Swagger rented movie schemas

/**
 * @openapi
 * components:
 *  schemas:
 *    RegisterUserInput:
 *      type: object
 *      required:
 *        - email
 *        - reemail
 *        - name
 *        - surname
 *        - password
 *        - repassword
 *      properties:
 *        email:
 *          type: string
 *          description: Email of the user
 *        reemail:
 *          type: string
 *          description: Retyped email for confirmation
 *        name:
 *          type: string
 *          description: Name of the user
 *        surname:
 *          type: string
 *          description: Surname of the user
 *        password:
 *          type: string
 *          description: Password of the user
 *        repassword:
 *          type: string
 *          description: Retyped password for confirmation
 *      example:
 *        email: test@example.com
 *        reemail: test@example.com
 *        name: Test
 *        surname: Mr
 *        password: test1234
 *        repassword: test1234
 */