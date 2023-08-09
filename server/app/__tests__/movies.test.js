import supertest from "supertest";
import { createServer } from "../app.js";
import { signJWT } from "../utils/jwt.utils.js";

const app = createServer();
const userPayload = {
  email: "envkt@example.com",
  name: "Test",
  surname: "Tester",
  role: "user",
};
const adminPayload = {
  email: "admin@example.com",
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
const wrongMovieExample = {
  nams: "Test",
  age: 5,
  stock: "99.99s",
};
const updateMovieExample = {
  price: 29.99,
  stock: 20,
};
const invalidUpdateMovieExample = {
  price: "Fifty five dollars",
  name: 20,
};

// Movies tests
describe("Movies", () => {
  // POST tests
  describe("POST /movies", () => {
    describe("Given the user is not logged in", () => {
      it("Should return status code 401", async () => {
        supertest(app).post(`/movies`).send(movieExample).expect(401);
      });
    });

    describe("Given the user is logged in but not an admin", () => {
      it("Should return status code 403", async () => {
        const accessToken = signJWT(userPayload, "20m");
        await supertest(app)
          .post(`/movies`)
          .send(movieExample)
          .set("Cookie", `accessToken=${accessToken}`)
          .expect(403);
      });
    });

    describe("Given an admin is logged in but request body is invalid", () => {
      it("Should return status code 403", async () => {
        const accessToken = signJWT(adminPayload, "20m");
        await supertest(app)
          .post(`/movies`)
          .send(wrongMovieExample)
          .set("Cookie", `accessToken=${accessToken}`)
          .expect(422);
      });
    });

    describe("Given an admin is logged in and request body is valid", () => {
      it("Should return a movie object and status code 201", async () => {
        const accessToken = signJWT(adminPayload, "20m");
        const { name, genre, price, stock } = movieExample;
        const { body, statusCode } = await supertest(app)
          .post(`/movies`)
          .send(movieExample)
          .set("Cookie", `accessToken=${accessToken}`);
        expect(body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name,
            genre,
            price,
            stock,
          })
        );
        expect(statusCode).toBe(201);
      });
    });

    describe("Given an admin is logged in but a movie with that name already exists", () => {
      it("Should return status code 400", async () => {
        const accessToken = signJWT(adminPayload, "20m");
        await supertest(app)
          .post(`/movies`)
          .send(movieExample)
          .set("Cookie", `accessToken=${accessToken}`)
          .expect(400);
      });
    });
  });

  // GET tests
  describe("GET /movies", () => {
    describe("Given the user is logged in", () => {
      it("Should return a list of movies and status code 200", async () => {
        const accessToken = signJWT(userPayload, "20m");
        const { body, statusCode } = await supertest(app)
          .get("/movies")
          .set("Cookie", `accessToken=${accessToken}`);

        if (body.length > 0) {
          expect(body).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                genre: expect.any(String),
                price: expect.any(Number),
                stock: expect.any(Number),
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
        await supertest(app).get("/movies").expect(401);
      });
    });
  });

  describe("GET /movies/:name", () => {
    describe("Given the user is logged in and the movie exists", () => {
      it("Should return a movie object and status code 200", async () => {
        const accessToken = signJWT(userPayload, "20m");
        const movieName = "Die Hard";
        const { body, statusCode } = await supertest(app)
          .get(`/movies/${movieName}`)
          .set("Cookie", `accessToken=${accessToken}`);

        expect(body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            genre: expect.any(String),
            price: expect.any(Number),
            stock: expect.any(Number),
          })
        );

        expect(statusCode).toBe(200);
      });
    });

    describe("Given the user is logged but the movie doesn't exist", () => {
      it("Should return status code 404", async () => {
        const accessToken = signJWT(userPayload, "20m");
        const movieName = "ThisMovieProbablyDoesNotExist";
        await supertest(app)
          .get(`/movies${movieName}`)
          .set("Cookie", `accessToken=${accessToken}`)
          .expect(404);
      });
    });

    describe("Given the user is not logged in", () => {
      it("Should return status code 401", async () => {
        await supertest(app).get("/movies").expect(401);
      });
    });
  });

  // PUT tests
  describe("PUT /movies/:name", () => {
    describe("Given an admin is logged in, movie exists and body is valid", () => {
      it("Should return status code 200", async () => {
        const accessToken = signJWT(adminPayload, "20m");
        await supertest(app)
          .put(`/movies/${movieExample.name}`)
          .send(updateMovieExample)
          .set("Cookie", `accessToken=${accessToken}`)
          .expect(200);
      });
    });

    describe("Given an admin is logged in, movie exists but body is invalid", () => {
      it("Should return status code 422", async () => {
        const accessToken = signJWT(adminPayload, "20m");
        await supertest(app)
          .put(`/movies/${movieExample.name}`)
          .send(invalidUpdateMovieExample)
          .set("Cookie", `accessToken=${accessToken}`)
          .expect(422);
      });
    });

    describe("Given a user is logged in", () => {
      it("Should return status code 403", async () => {
        const accessToken = signJWT(userPayload, "20m");
        await supertest(app)
          .put(`/movies/${movieExample.name}`)
          .send(updateMovieExample)
          .set("Cookie", `accessToken=${accessToken}`)
          .expect(403);
      });
    });

    describe("Given an admin is logged in but movie doesn't exist", () => {
      it("Should return status code 404", async () => {
        const accessToken = signJWT(adminPayload, "20m");
        await supertest(app)
          .put(`/movies/ThisMovieProbablyDoesNotExist`)
          .send(updateMovieExample)
          .set("Cookie", `accessToken=${accessToken}`)
          .expect(404);
      });
    });

    describe("Given the user is not logged in", () => {
      it("Should return status code 401", async () => {
        await supertest(app)
          .put(`/movies/${movieExample.name}`)
          .send(updateMovieExample)
          .expect(401);
      });
    });
  });

  // DELETE tests
  describe("DELETE /movies/:name", () => {
    describe("Given a user is logged in but not an admin", () => {
      it("Should return status code 403", async () => {
        const accessToken = signJWT(userPayload, "20m");
        await supertest(app)
          .delete(`/movies/${movieExample.name}`)
          .set("Cookie", `accessToken=${accessToken}`)
          .expect(403);
      });
    });

    describe("Given no user is logged in", () => {
      it("Should return status code 401", async () => {
        await supertest(app).delete(`/movies/${movieExample.name}`).expect(401);
      });
    });

    describe("Given an admin is logged in and movie exists", () => {
      it("Should return status code 200", async () => {
        const accessToken = signJWT(adminPayload, "20m");
        await supertest(app)
          .delete(`/movies/${movieExample.name}`)
          .set("Cookie", `accessToken=${accessToken}`)
          .expect(200);
      });
    });

    describe("Given an admin is logged in but movie does not exist", () => {
      it("Should return status code 404", async () => {
        const accessToken = signJWT(adminPayload, "20m");
        await supertest(app)
          .delete(`/movies/${movieExample.name}`)
          .set("Cookie", `accessToken=${accessToken}`)
          .expect(404);
      });
    });
  });
});
