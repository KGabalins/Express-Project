import express from "express";
import * as controller from "../controllers/user.controller.js";
import { requireUser } from "../middleware/requireUser.js";

const router = express.Router();

router
  /**
   * @openapi
   * /users:
   *  get:
   *    tags:
   *    - Users
   *    summary: Get current user data
   *    responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: "#/components/schemas/GetUserResponse"
   *      401:
   *        description: Unauthorized - User is not logged in
   */
  .get("/", requireUser, controller.getMyUserHandler)
    /**
   * @openapi
   * /users/isLoggedIn:
   *  get:
   *    tags:
   *    - Users
   *    summary: Get boolean is user logged in
   *    responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              
   */
  .get("/isLoggedIn", controller.getIsLoggedInHandler)
  /**
   * @openapi
   * /users/{email}:
   *  get:
   *    tags:
   *    - Users
   *    summary: Get specific user data
   *    parameters:
   *      - in: path
   *        name: email
   *        required: true
   *        schema:
   *          type: string
   *        description: Email of the user
   *    responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: "#/components/schemas/GetUserResponse"
   *      401:
   *        description: Unauthorized - User is not logged in
   *      404:
   *        description: Not found - User does not exist
   */
  .get("/:email", requireUser, controller.getUserDataHandler)
  /**
   * @openapi
   * /users:
   *  post:
   *    tags:
   *    - Users
   *    summary: Register a new user
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
   *              $ref: "#/components/schemas/GetUserResponse"
   *      409:
   *        description: Conflict - User already exists
   *      422:
   *        description: Unprocessable Entity - Invalid request body
   */
  .post("/", controller.registerUserHandler)
  /**
   * @openapi
   * /users/login:
   *  post:
   *    tags:
   *    - Users
   *    summary: Log in user (access token and refresh token are added to cookies)
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
  .post("/login", controller.loginUserHandler)
  /**
   * @openapi
   * /users:
   *  put:
   *    tags:
   *    - Users
   *    summary: Update user email
   *    requestBody:
   *      required: true
   *      description: A JSON object containing the new email.
   *      content:
   *        application/json:
   *          schema:
   *            $ref: "#/components/schemas/UpdateEmailInput"
   *    responses:
   *      200:
   *        description: Password successfully updated
   *      401:
   *        description: Unauthorized - User is not logged in
   *      409:
   *        description: Not found - User with this email doesn't exist
   *      422:
   *        description: Unprocessable Entity - Request body isn't valid
   */
  .put("/", requireUser, controller.updateUserEmailHandler)
  /**
   * @openapi
   * /users/{email}:
   *  put:
   *    tags:
   *    - Users
   *    summary: Update user password
   *    parameters:
   *      - in: path
   *        required: true
   *        name: email
   *        schema:
   *          type: string
   *        description: Email of the user
   *    requestBody:
   *      required: true
   *      description: A JSON object containing the the new password.
   *      content:
   *        application/json:
   *          schema:
   *            $ref: "#/components/schemas/UpdatePasswordInput"
   *    responses:
   *      200:
   *        description: Success - Password successfully updated
   *      401:
   *        description: Unauthorized - User is not logged in
   *      403:
   *        description: Forbiden - Not the same user or not an admin
   *      404:
   *        description: Not found - User with this email doesn't exist
   *      422:
   *        description: Unprocessable Entity - Request body isn't valid
   */
  .put("/:email", requireUser, controller.updateUserPasswordHandler)
  /**
   * @openapi
   * /users/logout:
   *  delete:
   *    tags:
   *    - Users
   *    summary: Log out user
   *    responses:
   *      200:
   *        description: Successfully logged out
   *      401:
   *        description: Unauthorized - User is not logged in
   */
  .delete("/logout", requireUser, controller.logoutUserHandler)
  /**
   * @openapi
   * /users/{email}:
   *  delete:
   *    tags:
   *    - Users
   *    summary: Delete user by email (requires admin privileges)
   *    parameters:
   *      - in: path
   *        required: true
   *        name: email
   *        schema:
   *          type: string
   *        description: Email of the user
   *    responses:
   *      200:
   *        description: Success - User successfully deleted
   *      401:
   *        description: Unauthorized - User is not logged in
   *      403:
   *        description: Forbiden - User is not an admin
   *      404:
   *        description: Not found - User with this email doesn't exist
   */
  .delete("/:email", requireUser, controller.deleteUserHandler);

export default router;
