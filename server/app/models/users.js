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
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = dynamoose.model("users", userSchema)
