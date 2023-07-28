const express = require("express");
const router = express.Router();
const controller = require("../controllers/permissions");
const { requireUser } = require("../middleware/requireUser");
const { requireAdmin } = require("../middleware/requireAdmin");

router
  /**
   * @openapi
   * /perm/{email}:
   *  put:
   *    tags:
   *    - Permissions
   *    parameters:
   *      - in: path
   *        schema: 
   *          type: string
   *        required: true
   *        name: email
   *        description: User email that will be updated
   *    requestBody:
   *      required: true
   *      description: A JSON object containing the role.
   *      content:
   *        application/json:
   *          schema:
   *            $ref: "#/components/schemas/UpdatePermissionInput"
   *    summary: Update user permission
   *    responses:
   *      200:
   *        description: Success - User permission updated
   *      401:
   *        description: Unauthorized - User is not logged in
   *      403:
   *        description: Forbiden - User is not an admin
   *      404:
   *        description: Not found - User not found
   *      422:
   *        description: Unprocessable Entity - Request body data is invalid
   */
  .put("/:email", requireUser, requireAdmin, controller.updateUserPerm);

module.exports = router;
