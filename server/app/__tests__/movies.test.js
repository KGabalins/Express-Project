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
const movieExists = {
  name: "Die Hard",
  genre: "Action",
  price: 99.99,
  stock: 99,
};
const wrongMovieExample = {
  nams: "Test",
  age: 5,
  stock: "99.99s",
};

// Movies tests
describe("Movies", () => {
  // GET tests
  describe("GET /movies", () => {
    describe("Given the user is logged in", () => {
      it("Should return a list of movies and status code 200", async () => {
        const accessToken = signJWT(userPayload, "20m");
        const { body, statusCode } = await request(app)
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
        await request(app).get("/movies").expect(401);
      });
    });
  });
  describe("GET /movies/:name", () => {
    describe("Given the user is logged in and the movie exists", () => {
      it("Should return a movie object and status code 200", async () => {
        const accessToken = signJWT(userPayload, "20m");
        const movieName = "Die Hard";
        const { body, statusCode } = await request(app)
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
        const { body, statusCode } = await request(app)
          .get(`/movies${movieName}`)
          .set("Cookie", `accessToken=${accessToken}`);

        expect(statusCode).toBe(404);
      });
    });
    describe("Given the user is not logged in", () => {
      it("Should return status code 401", async () => {
        await request(app).get("/movies").expect(401);
      });
    });
  });
  // POST tests
  describe("POST /movies", () => {
    describe("Given the user is not logged in", () => {
      it("Should return status code 401", async () => {
        const { statusCode } = await request(app)
          .post(`/movies`)
          .send(movieExample);

        expect(statusCode).toBe(401);
      });
    });
    describe("Given the user is logged in but not an admin", () => {
      it("Should return status code 403", async () => {
        const accessToken = signJWT(userPayload, "20m");
        const { statusCode } = await request(app)
          .post(`/movies`)
          .send(movieExample)
          .set("Cookie", `accessToken=${accessToken}`);

        expect(statusCode).toBe(403);
      });
    });
    describe("Given an admin is logged in but request body is invalid", () => {
      it("Should return status code 403", async () => {
        const accessToken = signJWT(adminPayload, "20m");
        const { statusCode } = await request(app)
          .post(`/movies`)
          .send(wrongMovieExample)
          .set("Cookie", `accessToken=${accessToken}`);

        expect(statusCode).toBe(422);
      });
    });
    describe("Given an admin is logged in but a movie with that name already exists", () => {
      it("Should return status code 403", async () => {
        const accessToken = signJWT(adminPayload, "20m");
        const { statusCode } = await request(app)
          .post(`/movies`)
          .send(movieExists)
          .set("Cookie", `accessToken=${accessToken}`);

        expect(statusCode).toBe(400);
      });
    });
    describe("Given an admin is logged in and request body is valid", () => {
      it("Should return a movie object and status code 201", async () => {
        const accessToken = signJWT(adminPayload, "20m");
        const { body, statusCode } = await request(app)
          .post(`/movies`)
          .send(movieExample)
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

        expect(statusCode).toBe(201);
      });
    });
  });
});

// describe("Integration tests for the movies API", () => {
//   it("GET /movies - success - get all the books", async () => {
//     const { body, statusCode } = await request(app).get("/movies");

//     expect(body).toEqual(
//       expect.arrayContaining([
//         expect.objectContaining({
//           id: expect.any(Number),
//           name: expect.any(String),
//           genre: expect.any(String),
//           price: expect.any(Number),
//           stock: expect.any(Number),
//         }),
//       ])
//     );

//     expect(statusCode).toBe(200);
//   });
// });

// describe("Movies API", () => {
//   it("GET /movies ---> array of movies", () => {
//     return supertest(app)
//       .get("/movies")
//       .expect("Content-type", /json/)
//       .expect(200)
//       .then((response) => {
//         expect(response.body).toEqual(
//           expect.arrayContaining([
//             expect.objectContaining({
//               id: expect.any(Number),
//               name: expect.any(String),
//               genre: expect.any(String),
//               price: expect.any(String),
//               stock: expect.any(Number),
//             }),
//           ])
//         );
//       });
//   });

// it("GET /movies/:name ---> specific movie by name", () => {
//   return supertest(app)
//     .get("/movies/Jaws")
//     .expect("Content-type", /json/)
//     .expect(200)
//     .then((response) => {
//       expect(response.body).toEqual(
//         expect.objectContaining({
//           id: expect.any(Number),
//           name: expect.any(String),
//           genre: expect.any(String),
//           price: expect.any(String),
//           stock: expect.any(Number),
//         })
//       );
//     });
// });

// it("GET /movies/:name ---> 404 if not found", () => {
//   return supertest(app)
//     .get("/movies/ThereProbablyIsNoMovieWithThisName")
//     .expect(404);
// });

// it("POST /movies ---> create movie", () => {
//   return supertest(app)
//     .post("/movies")
//     .send({
//       name: "Testing",
//       genre: "Testing",
//       price: "4.99$",
//       stock: 2,
//     })
//     .expect("Content-type", /json/)
//     .expect(201)
//     .then((response) => {
//       expect(response.body).toEqual(
//         expect.objectContaining({
//           name: "Testing",
//           genre: "Testing",
//           price: "4.99$",
//           stock: 2,
//         })
//       );
//     });
// });

// it("POST /movies ---> validate name", () => {
//   return supertest(app)
//     .post("/movies")
//     .send({
//       name: "Jaws",
//       genre: "Action",
//       price: "4.99$",
//       stock: 2,
//     })
//     .expect(400);
// });

// it("POST /movies ---> validate request body", () => {
//   return supertest(app)
//     .post("/movies")
//     .send({
//       genre: "Testing",
//     })
//     .expect(422);
// });

// it("PUT /movies/:name ---> update movie stock by name", () => {
//   return supertest(app)
//     .put("/movies/Jaws")
//     .send({
//       stock: 10,
//     })
//     .expect(200);
// });

// it("PUT /movies/:name ---> validate request body", () => {
//   return supertest(app)
//     .put("/movies/Jaws")
//     .send({
//       name: "five",
//     })
//     .expect(422);
// });

// it("PUT /movies/:name ---> validate movie name", () => {
//   return supertest(app)
//     .put("/movies/ThisMovieProbablyDoesntExist")
//     .send({
//       stock: 10,
//     })
//     .expect(404);
// });

// it("DELETE /movies/:name ---> delete movie by name", () => {
//   return supertest(app).delete("/movies/Die Hard").expect(200);
// });

// it("DELETE /movies/:name ---> validate movie name", () => {
//   return supertest(app)
//     .delete("/movies/ThisMovieProbablyDoesntExist")
//     .expect(404);
// });
// });
