import dynamoose from "dynamoose";

dynamoose.aws.ddb.local("http://localhost:4000");

const userPermSchema = new dynamoose.Schema({
  email: {
    type: String,
    hashKey: true,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
});

export const UserPerm = dynamoose.model("permissions", userPermSchema);

// Swagger user permission schemas

/**
 * @openapi
 * components:
 *  schemas:
 *    UpdatePermissionInput:
 *      type: object
 *      required:
 *        - role
 *      properties:
 *        role:
 *          type: string
 *          description: New user role
 *      example:
 *        role: user
 */