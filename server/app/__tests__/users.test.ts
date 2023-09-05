// import request from "supertest"
// import { createServer } from "../app.js"
// import * as moviesService from "../service/movie.service.js"
// import { signAccessJWT } from "../utils/jwt.utils.js"

// jest.mock("../service/movie.service.js")
// const app = createServer()


// const mockAdminPayload = {
//   email: "admin@example.com",
//   name: "Admin",
//   surname: "Administer",
//   role: "admin",
// };

// const mockAdminAccessToken = await signAccessJWT(mockAdminPayload.email, "20m");

// describe("Movies API", () => {
//   describe("GET movies", () => {
//     it("Should return a list of movies", async () => {
//       const response = await request(app)
//         .get("/movies")
//         .set("Cookie", mockAdminAccessToken)

//       expect(response.status).toBe(200)
//     })
//   })
//   it("Should create a new user", async () => {
//     // (moviesService.createMovie as jest.Mock).mockResolvedValue({
//     //   id: 1,
//     //   name: "JestTest",
//     //   genre: "Action",
//     //   price: 5,
//     //   stock: 5
//     // })
//     const createMovieMock = moviesService.createMovie as jest.Mock

//     createMovieMock.mockResolvedValue({
//       id: 1,
//       name: "JestTest",
//       genre: "Action",
//       price: 5,
//       stock: 5
//     })

//     const response = await request(app)
//       .post("/movies")
//       .send({ name: "JestTest", genre: "Action", price: 5, stock: 5 })
//       .set("Cookie", mockAdminAccessToken)

//     expect(response.status).toBe(201)
//     expect(response.body).toEqual({
//       id: 1,
//       name: "JestTest",
//       genre: "Action",
//       price: 5,
//       stock: 5
//     })
//   })
// })
