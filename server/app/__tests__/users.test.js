const request = require("supertest");
const { createServer } = require("../app");
const { signJWT, verifyJWT } = require("../utils/jwt.utils");

const app = createServer();

const userRegisterInput = {
  name: "Test",
  surname: "Mr",
  email: "test@example.com",
  reemail: "test@example.com",
  password: "test1234",
  repassword: "test1234",
};
const invalidUserLoginInput = {
  email: "NotAValidEmail",
  password: "--",
};
const userLoginInput = {
  email: userRegisterInput.email,
  password: userRegisterInput.password,
};
const mockAdminPayload = {
  email: "admin@example.com",
  name: "Admin",
  surname: "Administer",
  role: "admin",
};
let userAccessToken;
let updatedUserAccessToken;
const mockAdminAccessToken = signJWT(mockAdminPayload, "20m");
const mockUserAccessToken = signJWT(
  {
    email: "mock@example.com",
    name: "Mock",
    surname: "User",
    role: "user",
  },
  "20m"
);
const updateUserPasswordInput = {
  password: "newpassword",
  repassword: "newpassword",
};
const updateUserEmailInput = {
  email: "newTest@example.com",
  reemail: "newTest@example.com",
};

// Users tests
describe("Users", () => {
  // POST tests
  describe("POST /users", () => {
    describe("Given a valid request body", () => {
      it("Should return a user object and status code 201", async () => {
        const { email, name, surname } = userRegisterInput;
        const role = "user";
        const { body, statusCode } = await request(app)
          .post(`/users`)
          .send(userRegisterInput);

        expect(body).toEqual(
          expect.objectContaining({
            email,
            name,
            surname,
            role,
          })
        );

        expect(statusCode).toBe(201);
      });
    });
  });

  describe("POST /users/login", () => {
    describe("Given a valid email and password in request body", () => {
      it("Should return status code 200, set-cokies with access and refresh token in header and request body with session data", async () => {
        const { email, name, surname } = userRegisterInput;
        const role = "user";
        const { header, body, statusCode } = await request(app)
          .post("/users/login")
          .send(userLoginInput);

        expect(body).toEqual(
          expect.objectContaining({
            valid: true,
            sessionId: expect.any(Number),
            email,
            name,
            surname,
            role,
          })
        );

        expect(header["set-cookie"]).toEqual(
          expect.arrayContaining([
            expect.stringContaining("accessToken"),
            expect.stringContaining("refreshToken"),
          ])
        );

        // Extract the access token from the header
        const accessTokenString = header["set-cookie"][0].replace(
          "accessToken=",
          ""
        );
        const index = accessTokenString.search(";");
        userAccessToken = accessTokenString.substr(0, index);

        expect(statusCode).toBe(200);
      });
    });

    describe("Given the email or password is invalid", () => {
      it("Should return status code 401", async () => {
        await request(app)
          .post(`/users/login`)
          .send(invalidUserLoginInput)
          .expect(401);
      });
    });

    describe("Given the request body is invalid", () => {
      it("Should return status code 422", async () => {
        await request(app)
          .post(`/users/login`)
          .send({ price: 5, tomato: true })
          .expect(422);
      });
    });
  });

  // GET tests
  describe("GET /users", () => {
    describe("Given the user is logged in", () => {
      it("Should return current user object and status code 200", async () => {
        const { body, statusCode } = await request(app)
          .get("/users")
          .set("Cookie", `accessToken=${userAccessToken}`);

        expect(body).toEqual(
          expect.objectContaining({
            email: userRegisterInput.email,
            name: userRegisterInput.name,
            surname: userRegisterInput.surname,
            role: "user",
          })
        );

        expect(statusCode).toBe(200);
      });
    });

    describe("Given the user is not logged in", () => {
      it("Should return status code 401", async () => {
        await request(app).get("/users").expect(401);
      });
    });
  });

  describe("GET /users/:email", () => {
    describe("Given current user is logged in and searched user exists", () => {
      it("Should return a user object and status code 200", async () => {
        const { body, statusCode } = await request(app)
          .get(`/users/${userRegisterInput.email}`)
          .set("Cookie", `accessToken=${userAccessToken}`);

        expect(body).toEqual(
          expect.objectContaining({
            email: userRegisterInput.email,
            name: userRegisterInput.name,
            surname: userRegisterInput.surname,
            role: "user",
          })
        );

        expect(statusCode).toBe(200);
      });
    });

    describe("Given current user is logged in and searched user does not exist", () => {
      it("Should return status code 404", async () => {
        await request(app)
          .get(`/users/ThereProbablyIsNoUserWithThisEmail`)
          .set("Cookie", `accessToken=${userAccessToken}`)
          .expect(404);
      });
    });

    describe("Given the user is not logged in", () => {
      it("Should return status code 401", async () => {
        await request(app).get(`/users/${userRegisterInput.email}`).expect(401);
      });
    });
  });

  // PUT test
  describe("PUT /users/:email --- updates user's password", () => {
    describe("Given the user is not logged", () => {
      it("Should return status code 401", async () => {
        await request(app)
          .put(`/users/${userLoginInput.email}`)
          .send(updateUserPasswordInput)
          .expect(401);
      });
    });

    describe("Given the current user is not an admin or is not the target user", () => {
      it("Should return status code 403", async () => {
        await request(app)
          .put(`/users/${userLoginInput.email}`)
          .send(updateUserPasswordInput)
          .set("Cookie", `accessToken=${mockUserAccessToken}`)
          .expect(403);
      });
    });

    describe("Given the current user is an admin but target user does not exist", () => {
      it("Should return status code 404", async () => {
        await request(app)
          .put(`/users/ThereProbablyIsNoUserWithThisEmail`)
          .send(updateUserPasswordInput)
          .set("Cookie", `accessToken=${mockAdminAccessToken}`)
          .expect(404);
      });
    });

    describe("Given the current user is the target user but request body is invalid", () => {
      it("Should return status code 422", async () => {
        await request(app)
          .put(`/users/${userRegisterInput.email}`)
          .send({ apple: 3, pineapple: false })
          .set("Cookie", `accessToken=${userAccessToken}`)
          .expect(422);
      });
    });

    describe("Given the current user is the target user and request body is valid", () => {
      it("Should return status code 200", async () => {
        await request(app)
          .put(`/users/${userRegisterInput.email}`)
          .send(updateUserPasswordInput)
          .set("Cookie", `accessToken=${userAccessToken}`)
          .expect(200);
      });
    });
  });

  describe("PUT /users --- updates user's email", () => {
    describe("Given the user is not logged", () => {
      it("Should return status code 401", async () => {
        await request(app).put(`/users`).send(updateUserEmailInput).expect(401);
      });
    });

    describe("Given the email already exists", () => {
      it("Should return status code 409", async () => {
        await request(app)
          .put(`/users`)
          .send({
            email: userRegisterInput.email,
            reemail: userRegisterInput.email,
          })
          .set("Cookie", `accessToken=${userAccessToken}`)
          .expect(409);
      });
    });

    describe("Given the request body is invalid", () => {
      it("Should return status code 422", async () => {
        await request(app)
          .put(`/users`)
          .send({ apple: 3, pineapple: false })
          .set("Cookie", `accessToken=${userAccessToken}`)
          .expect(422);
      });
    });

    describe("Given the request body is valid", () => {
      it("Should return status code 200 and set new access token cookie", async () => {
        const { header, statusCode } = await request(app)
          .put(`/users`)
          .send(updateUserEmailInput)
          .set("Cookie", `accessToken=${userAccessToken}`);

        expect(statusCode).toBe(200);

        expect(header["set-cookie"]).toEqual(
          expect.arrayContaining([expect.stringContaining("accessToken")])
        );

        // Extract the updated access token from the header
        const accessTokenString = header["set-cookie"][0].replace(
          "accessToken=",
          ""
        );
        const index = accessTokenString.search(";");
        updatedUserAccessToken = accessTokenString.substr(0, index);
      });
    });
  });

  // DELETE tests
  describe("DELETE /users/logout", () => {
    describe("Given the user is not logged in", () => {
      it("Should return status code 401", async () => {
        await request(app).delete(`/users/logout`).expect(401);
      });
    });

    describe("Given the user is logged in", () => {
      it("Should return status code 200", async () => {
        await request(app)
          .delete(`/users/logout`)
          .set("Cookie", `accessToken=${updatedUserAccessToken}`)
          .expect(200);
      });
    });
  });

  describe("DELETE /users/:email", () => {
    describe("Given the user is not logged in", () => {
      it("Should return status code 401", async () => {
        await request(app).delete(`/users/${userLoginInput.email}`).expect(401);
      });
    });

    describe("Given the user is not an admin", () => {
      it("Should return status code 403", async () => {
        await request(app)
          .delete(`/users/${updateUserEmailInput.email}`)
          .set("Cookie", `accessToken=${mockUserAccessToken}`)
          .expect(403);
      });
    });

    describe("Given current user is an admin and deleted user exists", () => {
      it("Should return status code 404", async () => {
        await request(app)
          .delete(`/users/ThereShouldBeNoUserWithThisEmail`)
          .set("Cookie", `accessToken=${mockAdminAccessToken}`)
          .expect(404);
      });
    });

    describe("Given current user is an admin and deleted user exists", () => {
      it("Should return status code 200", async () => {
        await request(app)
          .delete(`/users/${updateUserEmailInput.email}`)
          .set("Cookie", `accessToken=${mockAdminAccessToken}`)
          .expect(200);
      });
    });
  });
});
