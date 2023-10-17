import express from "express";
import * as controller from "../controllers/user.controller.js";
import { requireUser } from "../middleware/requireUser.js";
import validate from "../middleware/validateResource.js";
import {
  getUserDataSchema,
  registerUserSchema,
  updateUserEmailSchema,
  updateUserPasswordSchema,
  deleteUserSchema,
} from "../schema/user.schema.js";
import { loginUserSchema } from "../schema/session.schema.js";

const router = express.Router();

router
  /**
   * @openapi
   * /api/users:
   *  get:
   *    tags:
   *    - Users
   *    summary: Get current user's data
   *    responses:
   *      200:
   *        description: Success - Shows data of the current user
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
   * /api/users/isLoggedIn:
   *  get:
   *    tags:
   *    - Users
   *    summary: Get data if the current user is logged in
   *    responses:
   *      200:
   *        description: Success - Shows if a user is logged in
   *        content:
   *          application/json:
   *            schema:
   *
   */
  .get("/isLoggedIn", controller.getIsLoggedInHandler)
  /**
   * @openapi
   * /api/users/{email}:
   *  get:
   *    tags:
   *    - Users
   *    summary: Get data of a user by its email
   *    parameters:
   *      - in: path
   *        name: email
   *        required: true
   *        schema:
   *          type: string
   *        description: Email of the user
   *    responses:
   *      200:
   *        description: Success - Shows data of a specific user
   *        content:
   *          application/json:
   *            schema:
   *              $ref: "#/components/schemas/GetUserResponse"
   *      401:
   *        description: Unauthorized - User is not logged in
   *      404:
   *        description: Not found - User does not exist
   *      422:
   *        description: Unprocessable Entity - Invalid request body or params
   */
  .get(
    "/:email",
    requireUser,
    validate(getUserDataSchema),
    controller.getUserDataHandler
  )
  /**
   * @openapi
   * /api/users:
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
   *        description: Success - User successfully registered
   *        content:
   *          application/json:
   *            schema:
   *              $ref: "#/components/schemas/GetUserResponse"
   *      409:
   *        description: Conflict - User already exists
   *      422:
   *        description: Unprocessable Entity - Invalid request body or params
   */
  .post("/", validate(registerUserSchema), controller.registerUserHandler)
  /**
   * @openapi
   * /api/users/login:
   *  post:
   *    tags:
   *    - Users
   *    summary: Log in a user
   *    requestBody:
   *      required: true
   *      description: A JSON object containing the email and password.
   *      content:
   *        application/json:
   *          schema:
   *            $ref: "#/components/schemas/LoginUserInput"
   *    responses:
   *      200:
   *        description: Seuccess - Successfully logged in
   *        content:
   *          application/json:
   *            schema:
   *              $ref: "#/components/schemas/LoginUserResponse"
   *      401:
   *        description: Unauthorized - Invalid email or password
   *      422:
   *        description: Unprocessable Entity - Invalid request body or params
   */
  .post("/login", validate(loginUserSchema), controller.loginUserHandler)
  /**
   * @openapi
   * /api/users/changeEmail:
   *  put:
   *    tags:
   *    - Users
   *    summary: Update current user's email
   *    requestBody:
   *      required: true
   *      description: A JSON object containing the new email.
   *      content:
   *        application/json:
   *          schema:
   *            $ref: "#/components/schemas/UpdateEmailInput"
   *    responses:
   *      200:
   *        description: Success - Email successfully updated
   *      401:
   *        description: Unauthorized - User is not logged in
   *      403:
   *        description: Forbidden - Entered password is incorrect
   *      409:
   *        description: Conflict - User with this email already exist
   *      422:
   *        description: Unprocessable Entity - Invalid request body or params
   */
  .put(
    "/changeEmail",
    requireUser,
    validate(updateUserEmailSchema),
    controller.updateUserEmailHandler
  )
  /**
   * @openapi
   * /api/users/changePassword:
   *  put:
   *    tags:
   *    - Users
   *    summary: Update current user's password
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
   *        description: Forbidden - Old password is incorrect
   *      422:
   *        description: Unprocessable Entity - Invalid request body or params
   */
  .put(
    "/changePassword",
    requireUser,
    validate(updateUserPasswordSchema),
    controller.updateUserPasswordHandler
  )
  /**
   * @openapi
   * /api/users/logout:
   *  delete:
   *    tags:
   *    - Users
   *    summary: Log out the current user
   *    responses:
   *      200:
   *        description: Success - Successfully logged out
   *      401:
   *        description: Unauthorized - User is not logged in
   */
  .delete("/logout", requireUser, controller.logoutUserHandler)
  /**
   * @openapi
   * /api/users/{email}:
   *  delete:
   *    tags:
   *    - Users
   *    summary: Delete a user by its email
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
   *        description: Forbiden - User is not an admin or the selected user
   *      404:
   *        description: Not found - User with this email doesn't exist
   *      422:
   *        description: Unprocessable Entity - Invalid request body or params
   */
  .delete(
    "/:email",
    validate(deleteUserSchema),
    requireUser,
    controller.deleteUserHandler
  );

export default router;
