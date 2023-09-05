import dynamoose from "dynamoose";
dynamoose.aws.ddb.local("http://localhost:4000");
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
const User = dynamoose.model("users", userSchema);
export default User;
// Swagger user schemas
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
 *    UpdatePasswordInput:
 *      type: object
 *      required:
 *        - password
 *        - repassword
 *      properties:
 *        password:
 *          type: string
 *          description: New password for the user
 *        repassword:
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
