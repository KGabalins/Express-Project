import dynamoose, { model } from "dynamoose";
import { Item } from "dynamoose/dist/Item.js";

dynamoose.aws.ddb.local("http://localhost:4000");

export interface UserAttributes extends Item {
  email: string,
  name: string,
  surname?: string,
  password: string,
}

export interface UserData {
  email: string,
  name: string,
  surname?: string,
  role: string,
}
 
export interface CreateUserData extends Omit<UserData, "role"> { }

const userSchema = new dynamoose.Schema({
  email: {
    type: String,
    hashKey: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = dynamoose.model<UserAttributes>("users", userSchema);

export default User

// Swagger user schemas

/**
 * @openapi
 * components:
 *  schemas:
 *    RegisterUserInput:
 *      type: object
 *      required:
 *        - email
 *        - confirmEmail
 *        - name
 *        - surname
 *        - password
 *        - confirmPassword
 *      properties:
 *        email:
 *          type: string
 *          description: Email of the user
 *        confirmEmail:
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
 *        confirmPassword:
 *          type: string
 *          description: Retyped password for confirmation
 *      example:
 *        email: test@example.com
 *        confirmEmail: test@example.com
 *        name: Test
 *        surname: Mr
 *        password: test1234
 *        confirmPassword: test1234
 *    UpdatePasswordInput:
 *      type: object
 *      required:
 *        - oldPassword
 *        - newPassword
 *        - confirmNewPassword
 *      properties:
 *        oldPassword:
 *          type: string
 *          description: Old password for the user
 *        newPassword:
 *          type: string
 *          description: New password for the user
 *        confirmNewPassword:
 *          type: string
 *          description: Retyped new password for the user
 *    UpdateEmailInput:
 *      type: object
 *      required:
 *        - newEmail
 *        - confirmNewEmail
 *        - password
 *      properties:
 *        newEmail:
 *          type: string
 *          description: New email for the user
 *        confirmNewEmail:
 *          type: string
 *          description: Retyped new email for the user
 *        password:
 *          type: string
 *          description: Password of the user
 *    GetUserResponse:
 *      type: object
 *      properties:
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
 *          description: Role of the user
 * 
 */