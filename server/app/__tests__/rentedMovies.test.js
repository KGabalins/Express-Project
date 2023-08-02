const request = require("supertest");
const { createServer } = require("../app");
const { signJWT } = require("../utils/jwt.utils");

const app = createServer();
const registerUserPayload = {
  email: "envkt@example.com",
  reemail: "envkt@example.com",
  name: "Test",
  surname: "Tester",
  password: "test1234",
  repassword: "test1234",
};
const userPayload = {
  email: "envkt@example.com",
  name: "Test",
  surname: "Tester",
  role: "user",
};
const differentUserPayload = {
  email: "different@example.com",
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
const movieExample = {
  name: "Test name",
  genre: "Test genre",
  price: 99.99,
  stock: 99,
};
const movieOutOfStockExample = {
  name: "OutOfStock",
  genre: "Test genre",
  price: 99.99,
  stock: 0,
};
const updateMovieTimeExample = {
  method: "-",
};
const wrongUpdateMovieTimeExample = {
  method: "add",
};
const adminAccessToken = signJWT(adminPayload, "20m");
const userAccessToken = signJWT(userPayload, "20m");
const differentUserAccessToken = signJWT(differentUserPayload, "20m");
let rentedMovieId = 0;

// Rented movies tests
describe("Rented Movies", () => {
  // Before all rented movies tests begin
  beforeAll(async () => {
    // Create a dummy movie
    await request(app)
      .post(`/movies`)
      .send(movieExample)
      .set("Cookie", `accessToken=${adminAccessToken}`);
    // Create a dummy movie with 0 stock
    await request(app)
      .post(`/movies`)
      .send(movieOutOfStockExample)
      .set("Cookie", `accessToken=${adminAccessToken}`);
    // Create a dummy user
    await request(app)
      .post(`/users`)
      .send(registerUserPayload)
      .set("Cookie", `accessToken=${adminAccessToken}`);
  });
  // After rented movies tests have ended
  afterAll(async () => {
    // Delete the dummy movie
    await request(app)
      .delete(`/movies/${movieExample.name}`)
      .set("Cookie", `accessToken=${adminAccessToken}`);
    // Delete the dummy movie with 0 stocks
    await request(app)
      .delete(`/movies/${movieOutOfStockExample.name}`)
      .set("Cookie", `accessToken=${adminAccessToken}`);
    // Delete the dummy user
    await request(app)
      .delete(`/users/${registerUserPayload.email}`)
      .set("Cookie", `accessToken=${adminAccessToken}`);
  });
  // POST tests
  describe("POST /rentedMovies", () => {
    describe("Given a user is logged in and movie exists", () => {
      it("Should return a rented movie object and status code 201", async () => {
        const { name, genre, price } = movieExample;
        const { body, statusCode } = await request(app)
          .post(`/rentedMovies/${movieExample.name}`)
          .set("Cookie", `accessToken=${userAccessToken}`);
        expect(body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name,
            genre,
            time: expect.any(Number),
            price,
            renter: userPayload.email,
          })
        );
        expect(statusCode).toBe(201);
        rentedMovieId = body.id;
      });
    });

    describe("Given a user is logged in but the movie does not exists", () => {
      it("Should return status code 404", async () => {
        await request(app)
          .post(`/rentedMovies/ThisMovieProbablyDoesNotExist`)
          .set("Cookie", `accessToken=${userAccessToken}`)
          .expect(404);
      });
    });

    describe("Given the user is not logged in", () => {
      it("Should return status code 401", async () => {
        await request(app)
          .post(`/rentedMovies/${movieExample.name}`)
          .expect(401);
      });
    });

    describe("Given the movie exists, user is logged in but the movie is out of stock", () => {
      it("Should return status code 409", async () => {
        await request(app)
          .post(`/rentedMovies/${movieOutOfStockExample.name}`)
          .set("Cookie", `accessToken=${userAccessToken}`)
          .expect(409);
      });
    });
  });

  // GET tests
  describe("GET /rentedMovies", () => {
    describe("Given the user is logged in", () => {
      it("Should return a list of user's rented movies and status code 200", async () => {
        const { body, statusCode } = await request(app)
          .get("/rentedMovies")
          .set("Cookie", `accessToken=${userAccessToken}`);
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
        await request(app).get("/rentedMovies").expect(401);
      });
    });
  });

  describe("GET /rentedMovies/:email", () => {
    describe("Given the admin is logged in and the email exists", () => {
      it("Should return a list of user's rented movies and status code 200", async () => {
        const { body, statusCode } = await request(app)
          .get(`/rentedMovies/${userPayload.email}`)
          .set("Cookie", `accessToken=${adminAccessToken}`);
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
        await request(app)
          .get(`/rentedMovies/${userPayload.email}`)
          .expect(401);
      });
    });

    describe("Given the user is not an admin", () => {
      it("Should return status code 403", async () => {
        await request(app)
          .get(`/rentedMovies/${userPayload.email}`)
          .set("Cookie", `accessToken=${userAccessToken}`)
          .expect(403);
      });
    });

    describe("Given the user does not exist", () => {
      it("Should return status code 404", async () => {
        await request(app)
          .get(`/rentedMovies/${differentUserPayload.email}`)
          .set("Cookie", `accessToken=${adminAccessToken}`)
          .expect(404);
      });
    });
  });

  describe("GET /rentedMovies/id/:id", () => {
    describe("Given the admin is logged in and the id exists", () => {
      it("Should return the rented movie and status code 200", async () => {
        const { body, statusCode } = await request(app)
          .get(`/rentedMovies/id/${rentedMovieId}`)
          .set("Cookie", `accessToken=${adminAccessToken}`);

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

    describe("Given the request parameters are not valid", () => {
      it("Should return status code 400", async () => {
        await request(app)
          .get(`/rentedMovies/id/ThisIsNotAValidId`)
          .set("Cookie", `accessToken=${adminAccessToken}`)
          .expect(400);
      });
    });

    describe("Given the user is not logged in", () => {
      it("Should return status code 401", async () => {
        await request(app).get(`/rentedMovies/id/${rentedMovieId}`).expect(401);
      });
    });

    describe("Given the user is not an admin", () => {
      it("Should return status code 403", async () => {
        await request(app)
          .get(`/rentedMovies/id/${rentedMovieId}`)
          .set("Cookie", `accessToken=${userAccessToken}`)
          .expect(403);
      });
    });

    describe("Given the rented movie does not exist", () => {
      it("Should return status code 404", async () => {
        await request(app)
          .get(`/rentedMovies/id/0`)
          .set("Cookie", `accessToken=${adminAccessToken}`)
          .expect(404);
      });
    });
  });

  // PUT tests
  describe("PUT /rentedMovies/id/:id", () => {
    describe("Given the rented movie exists, current user is the owner and request body is valid", () => {
      it("Should return status code 200", async () => {
        await request(app)
          .put(`/rentedMovies/id/${rentedMovieId}`)
          .send(updateMovieTimeExample)
          .set("Cookie", `accessToken=${userAccessToken}`)
          .expect(200);
      });
    });

    describe("Given the rented movie's time has reached it's limit", () => {
      it("Should return status code 409", async () => {
        await request(app)
          .put(`/rentedMovies/id/${rentedMovieId}`)
          .send(updateMovieTimeExample)
          .set("Cookie", `accessToken=${userAccessToken}`)
          .expect(409);
      });
    });

    describe("Given the user is not logged in", () => {
      it("Should return status code 401", async () => {
        await request(app)
          .put(`/rentedMovies/id/${rentedMovieId}`)
          .send(updateMovieTimeExample)
          .expect(401);
      });
    });

    describe("Given the request parameters are not valid", () => {
      it("Should return status code 400", async () => {
        await request(app)
          .put(`/rentedMovies/id/ThisIsNotAValidId`)
          .send(updateMovieTimeExample)
          .set("Cookie", `accessToken=${userAccessToken}`)
          .expect(400);
      });
    });

    describe("Given the rented movies owner is not the current user", () => {
      it("Should return status code 403", async () => {
        await request(app)
          .put(`/rentedMovies/id/${rentedMovieId}`)
          .send(updateMovieTimeExample)
          .set("Cookie", `accessToken=${differentUserAccessToken}`)
          .expect(403);
      });
    });

    describe("Given the rented movie does not exist", () => {
      it("Should return status code 404", async () => {
        await request(app)
          .put(`/rentedMovies/id/0`)
          .send(updateMovieTimeExample)
          .set("Cookie", `accessToken=${differentUserAccessToken}`)
          .expect(404);
      });
    });

    describe("Given the request body is not valid", () => {
      it("Should return status code 422", async () => {
        await request(app)
          .put(`/rentedMovies/id/${rentedMovieId}`)
          .send(wrongUpdateMovieTimeExample)
          .set("Cookie", `accessToken=${userAccessToken}`)
          .expect(422);
      });
    });
  });

  // DELETE tests
  describe("DELETE /rentedMovies/id/:id", () => {
    describe("Given the request parameters are not a valid id", () => {
      it("Should return status code 400", async () => {
        await request(app)
          .delete(`/rentedMovies/id/ThisIsNotAValidId`)
          .set("Cookie", `accessToken=${userAccessToken}`)
          .expect(400);
      });
    });

    describe("Given a user is not logged in", () => {
      it("Should return status code 401", async () => {
        await request(app)
          .delete(`/rentedMovies/id/${rentedMovieId}`)
          .expect(401);
      });
    });

    describe("Given the rented movie exists but current user is not the owner", () => {
      it("Should return status code 403", async () => {
        await request(app)
          .delete(`/rentedMovies/id/${rentedMovieId}`)
          .set("Cookie", `accessToken=${differentUserAccessToken}`)
          .expect(403);
      });
    });

    describe("Given the rented movie exists and its owner is the current user", () => {
      it("Should return status code 200", async () => {
        await request(app)
          .delete(`/rentedMovies/id/${rentedMovieId}`)
          .set("Cookie", `accessToken=${userAccessToken}`)
          .expect(200);
      });
    });

    describe("Given a user is logged in but the rented movie does not exist", () => {
      it("Should return status code 404", async () => {
        await request(app)
          .delete(`/rentedMovies/id/${rentedMovieId}`)
          .set("Cookie", `accessToken=${userAccessToken}`)
          .expect(404);
      });
    });
  });
});
