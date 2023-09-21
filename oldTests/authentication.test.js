// import { createServer } from "../app.js";
// import { signJWT } from "../utils/jwt.utils.js";
// import * as request from "supertest";
// import { deserializeUser } from "../middleware/deserializeUser.js";

// const app = createServer();

// const registerUserInput = {
//   email: "test@example.com",
//   reemail: "test@example.com",
//   name: "User",
//   surname: "Tester",
//   password: "123456789",
//   repassword: "123456789",
// };
// const loginUserInput = {
//   email: "test@example.com",
//   password: "123456789",
// };
// let userAccessToken;

// const mockAdminPayload = {
//   email: "admin@example.com",
//   name: "Admin",
//   surname: "Tester",
//   role: "admin",
// };
// const mockAdminAccessToken = signJWT(mockAdminPayload, "20m");

// describe("When accessing any API", () => {
//   describe("Deserialize user middleware is called", () => {
//     beforeAll(async () => {
//       await request(app).post("/users").send(registerUserInput);
//       const { header } = await request(app)
//         .post("/users/login")
//         .send(loginUserInput);

//       // Extract the access token from the header
//       const accessTokenString = header["set-cookie"][0].replace(
//         "accessToken=",
//         ""
//       );
//       const index = accessTokenString.search(";");
//       userAccessToken = accessTokenString.substr(0, index);
//     });
//     afterAll(async () => {
//       await request(app)
//         .delete("/users/logout")
//         .set("Cookie", `accessToken=${userAccessToken}`);
//       await request(app)
//         .delete(`/users/${loginUserInput.email}`)
//         .set("Cookie", `accessToken=${mockAdminAccessToken}`);
//     });

//     afterEach(() => {
//       jest.restoreAllMocks();
//     });

//     describe("Given a valid access token", () => {
//       it("Should return", async () => {
//         const result = await request(app)
//           .get("/movies")
//           .set("Cookie", `accessToken=${userAccessToken}`);
//       });
//     });
//   });
// });
