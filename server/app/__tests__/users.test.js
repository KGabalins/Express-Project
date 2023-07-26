const UserControler = require("../controllers/users")
const app = require("../app");
const request = require("supertest");
const bcrypt = require("bcrypt")

const userPayload = {
  name: "Test",
  surname: "Mr",
  email: "test@example.com",
  password: "test1234",
};


const userInput = {
  name: "Test",
  surname: "Mr",
  email: "test@example.com",
  reemail: "test@example.com",
  password: "test1234",
  repassword: "test1234",
};
describe("login", () => {});

describe("register", () => {
  it("returns status code 422 if request body is invalid", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "test@example.com" });

    expect(res.statusCode).toEqual(422);
  });
  it("returns status code 201 if request body is valid", async () => {

    const createUserControllerMock = jest
      .spyOn(UserControler, "addUser")
      .mockReturnValueOnce(userPayload);

    const { statusCode, body } = await request(app).post("/users").send(userInput);
    expect(statusCode).toBe(201)
    expect(await bcrypt.compare(userPayload.password, body.password)).toBe(true)
    expect(createUserControllerMock).toHaveBeenCalledWith(userInput);
  });
});
