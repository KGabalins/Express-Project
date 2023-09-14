import request from "supertest";
import createServer from "../app.js";
import * as UserService from "../service/user.service.js";
const app = createServer();
const registerUserInput = {
    name: "Test_User",
    surname: "Test_User",
    email: "testuser@example.com",
    confirmEmail: "testuser@example.com",
    password: "testpassword",
    confirmPassword: "testpassword"
};
const wrongEmailInput = {
    name: "Test_User",
    surname: "Test_User",
    email: "testuser@example.com",
    confirmEmail: "wrong@example.com",
    password: "testpassword",
    confirmPassword: "testpassword"
};
const wrongPasswordInput = {
    name: "Test_User",
    surname: "Test_User",
    email: "testuser@example.com",
    confirmEmail: "testuser@example.com",
    password: "testpassword",
    confirmPassword: "wrongpassword"
};
describe("User", () => {
    describe("POST users", () => {
        describe("Given the emails do not match", () => {
            it("Should return status code 422", async () => {
                await request(app)
                    .post("/users")
                    .send(wrongEmailInput)
                    .expect(422);
            });
        });
        describe("Given the request body is valid", () => {
            it("Should return status code 201", async () => {
                const registerUserServiceMock = jest.spyOn(UserService, "registerUser");
                await request(app).post("/users").send(registerUserInput);
                expect(registerUserServiceMock).toBeCalledTimes(1);
            });
        });
    });
    describe("DELETE users", () => {
        describe("Given the user is logged in", () => {
        });
    });
});
