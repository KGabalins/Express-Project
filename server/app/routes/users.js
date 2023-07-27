const express = require("express");
const router = express.Router();
const controller = require("../controllers/users");
const { requireUser } = require("../middleware/requireUser");

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
 *    RegisterUserResponse:
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
 *        password:
 *          type: string
 *          description: Hashed password of the user
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
 * 
 */

router
  .get("/", requireUser, controller.getMyUser)
  .get("/:email", requireUser, controller.getUser)
    /**
   * @openapi
   * /users:
   *  post:
   *    tags:
   *    - Users
   *    summary: Registers a new user
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: "#/components/schemas/RegisterUserInput"
   *    responses:
   *      201:
   *        description: Success
   *        content: 
   *          application/json: 
   *            schema:
   *              $ref: "#/components/schemas/RegisterUserResponse"
   *      409:
   *        description: Conflict
   *      422:
   *        description: Unprocessable Entity
   */         
  .post("/", controller.addUser)
  /**
   * @openapi
   * /users/login:
   *  post:
   *    tags:
   *    - Users
   *    summary: Logs in and returns the authentification cookie
   *    requestBody:
   *      required: true
   *      description: A JSON object containing the email and password.
   *      content:
   *        application/json:
   *          schema:
   *            $ref: "#/components/schemas/LoginUserInput"
   *    responses:
   *      200:
   *        description: Successfully logged in
   *        content: 
   *          application/json: 
   *            schema:
   *              $ref: "#/components/schemas/LoginUserResponse"
   *      401:
   *        description: Unauthorized - invalid email or password
   *      422:
   *        description: Unprocessable Entity - haven't filled all the fields
   */           
  .post("/login", controller.loginUser)
  .put("/", requireUser, controller.updateUserEmail)
  .put("/:email", requireUser, controller.updateUserPassword)
  .delete("/logout", requireUser, controller.logoutUser)
  .delete("/:email", requireUser, controller.deleteUser);

module.exports = router;
