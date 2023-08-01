const request = require("supertest");
const { createServer } = require("../app");
const { signJWT } = require("../utils/jwt.utils");

const app = createServer();
const userPayload = {
  email: "envkt@example.com",
  name: "Test",
  surname: "Tester",
  role: "user",
};
const adminPayload = {
  email: "raivo.k.g@inbox.lv",
  name: "Admin",
  surname: "Administer",
  role: "admin",
};

// Rented movies tests
describe("Movies", () => {
  // GET tests
  describe("GET /rentedMovies", () => {
    describe("Given the user is logged in", () => {
      it("Should return a list of user's rented movies and status code 200", async () => {
        const accessToken = signJWT(userPayload, "20m");
        const { body, statusCode } = await request(app)
          .get("/rentedMovies")
          .set("Cookie", `accessToken=${accessToken}`);

        if (body.length > 0) {
          expect(body).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                genre: expect.any(String),
                time: expect.any(Number),
                price: expect.any(Number),
                renter: expect.any(String),
              }),
            ])
          );
        } else {
          expect(body).toEqual([]);
        }
        expect(statusCode).toBe(200);
      });
    });
    describe("Given the user is not logged in", () => {
      it("Should return status code 401", async () => {
        await request(app).get("/movies").expect(401);
      });
    });
  });
  describe("GET /rentedMovies/:email", () => {
    describe("Given the admin is logged in and the email exists", () => {
      it("Should return a list of user's rented movies and status code 200", async () => {
        const accessToken = signJWT(adminPayload, "20m");
        const email = "raivo.k.g@inbox.lv";
        const { body, statusCode } = await request(app)
          .get(`/rentedMovies/${email}`)
          .set("Cookie", `accessToken=${accessToken}`);

        if (body.length > 0) {
          expect(body).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                genre: expect.any(String),
                time: expect.any(Number),
                price: expect.any(Number),
                renter: expect.any(String),
              }),
            ])
          );
        } else {
          expect(body).toEqual([]);
        }
        expect(statusCode).toBe(200);
      });
    });
  });
  describe("GET /rentedMovies/:email", () => {
    describe("Given the admin is logged in and the id exists", () => {
      it("Should return the rented movie and status code 200", async () => {
        const accessToken = signJWT(adminPayload, "20m");
        const id = 2;
        const { body, statusCode } = await request(app)
          .get(`/rentedMovies/id/${id}`)
          .set("Cookie", `accessToken=${accessToken}`);

        expect(body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            genre: expect.any(String),
            time: expect.any(Number),
            price: expect.any(Number),
            renter: expect.any(String),
          })
        );

        expect(statusCode).toBe(200);
      });
    });
  });
});
