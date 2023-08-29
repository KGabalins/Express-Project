import { DataTypes, Model } from "sequelize";
import db from "../config/postgres.js";
class Session extends Model {
}
Session.init({
    sessionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    valid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    sequelize: db,
    modelName: "Session",
    tableName: "sessions"
});
// const Session = db.define("session", {
//   sessionId: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   surname: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   role: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   valid: {
//     type: DataTypes.BOOLEAN,
//     allowNull: false,
//     defaultValue: true,
//   },
// });
export default Session;
// Swagger session schemas
/**
 * @openapi
 * components:
 *  schemas:
 *    LoginUserInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          description: Email of the user
 *        password:
 *          type: string
 *          description: Password of the user
 *    LoginUserResponse:
 *      type: object
 *      properties:
 *        valid:
 *          type: boolean
 *          description: Shows if user session is valid
 *        sessionId:
 *          type: integer
 *          description: Session id of the user
 *        email:
 *          type: string
 *          description: Email of the user
 *        name:
 *          type: string
 *          description: Name of the user
 *        surname:
 *          type: string
 *          description: Surname of the user
 *        role:
 *          type: string
 *          description: Role / permissions of the user
 */
