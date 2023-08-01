const request = require("supertest");
const { createServer } = require("../app");

const app = createServer();
const userPayload = {
  email: "raivo.k.g@inbox.lv",
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

// Users tests
describe("Users", () => {
  // POST tests
  describe("POST /users/login", () => {
    describe("Given a valid email and password in request body", () => {
      it("Should return status code 200 set-cokies with access and refresh token in header and request body with session data", async () => {
        const { header, body, statusCode } = await request(app)
          .post("/users/login")
          .send(userPayload);

        expect(body).toEqual(expect.objectContaining({
          valid: true,
          sessionId: expect.any(Number),
          email: expect.any(String),
          name: expect.any(String),
          surname: expect.any(String),
          role: expect.any(String),
        }))

        expect(header["set-cookie"]).toEqual(expect.arrayContaining([
          expect.stringContaining("accessToken"),
          expect.stringContaining("refreshToken"),
        ]))

        expect(statusCode).toBe(200);
      });
    });
  });
});
