const dynamoose = require("dynamoose");

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

const UserPerm = dynamoose.model("permissions", userPermSchema);

module.exports = {
  UserPerm,
};
