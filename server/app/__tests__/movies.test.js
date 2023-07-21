const supertest = require("supertest");
const app = require("../index");

describe("Movies API", () => {
  it("GET /movies ---> array of movies", () => {
    return supertest(app)
      .get("/movies")
      .expect("Content-type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              genre: expect.any(String),
              price: expect.any(String),
              stock: expect.any(Number),
            }),
          ])
        );
      });
  });

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
});
