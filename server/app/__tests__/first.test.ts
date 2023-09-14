import request from "supertest"
import createServer from "../app.js"
import { signTestJWT, verifyAccessJWT } from "../utils/jwt.utils.js"

const app = createServer()
const userPayload = {
  sessionId: 99999,
  name: "Test_User",
  surname: "Test_User",
  email: "testuser@example.com",
  role: "user"
}
const adminPayload = {
  sessionId: 99999,
  name: "Test_Admin",
  surname: "Test_Admin",
  email: "testadmin@example.com",
  role: "admin"
}
const userAccessToken = signTestJWT(userPayload, "5m")
const adminAccessToken = signTestJWT(adminPayload, "5m")

describe("Movies", () => {

  describe("Get all movies", () => {

    describe("Given the user is not logged in", () => {

      it("Should return status code 401", async () => {
        await request(app).get("/movies").expect(401)
      })
    })

    describe("Given the user is logged in", () => {

      it("Should return status code 200", async () => {
        const { body, statusCode } = await request(app)
          .get("/movies")
          .set("Cookie", `accessToken=${userAccessToken}`)

        expect(body).toEqual(expect.arrayContaining([
          expect.objectContaining({
            name: expect.any(String),
            genre: expect.any(String),
            price: expect.any(Number),
            stock: expect.any(Number)
          })
        ]))

        expect(statusCode).toBe(200)
      })
    })
  })

  describe("Get a specific movie", () => {

    describe("Given a user is not logged in", () => {

      it("Should return status code 401", async () => {
        await request(app)
          .get(`/movies/Die Hard`)
          .expect(401)
      })
    })

    describe("Given the user is logged in but the movie does not exist", () => {

      it("Should return status code 404", async () => {
        await request(app)
          .get(`/movies/A Movie With This Name Should Never Exist%295-18i5ti5235jdfijs`)
          .set("Cookie", `accessToken=${userAccessToken}`)
          .expect(404)
      })
    })
  })
})
