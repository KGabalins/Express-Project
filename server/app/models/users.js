const dynamoose = require("dynamoose");

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
    default: "",
  },
  password: {
    type: String,
    required: true,
  },
});

const User = dynamoose.model("users", userSchema)

const userPermSchema = new dynamoose.Schema({
  email: {
    type: String,
    hashKey: true,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

const UserPerm = dynamoose.model("permissions", userPermSchema)

module.exports = {
  User,
  UserPerm
}
