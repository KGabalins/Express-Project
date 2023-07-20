const supertest = require("supertest");
const app = require("../index");

describe("Rented movies API", () => {
  it("GET /rentedMovies/:email ---> array of movies", () => {
    return supertest(app)
      .get("/rentedMovies/raivo.k.g@gmail.com")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              genre: expect.any(String),
              time: expect.any(Number),
              price: expect.any(String),
              renter: expect.any(String),
            }),
          ])
        );
      });
  });

  it("GET /rentedMovies/:name ---> 404 if not found", () => {
    return supertest(app)
      .get("/rentedMovies/ThereProbablyIsntAnyUserWithThisEmail")
      .expect(404);
  });

  it("GET /rentedMovies/id/:id ---> specific rented movie by id", () => {
    return supertest(app)
      .get("/rentedMovies/id/3")
      .expect("Content-type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            genre: expect.any(String),
            time: expect.any(Number),
            price: expect.any(String),
            renter: expect.any(String),
          })
        );
      });
  });

  it("GET /rentedMovies/id/:id ---> 404 if not found", () => {
    return supertest(app)
      .get("/rentedMovies/id/999999")
      .expect(404);
  });

  it("POST /rentedMovies ---> create rented movie", () => {
    return supertest(app)
      .post("/rentedMovies")
      .send({
        name: "Testing",
        genre: "Testing",
        time: 12,
        price: "4.99$",
        renter: "raivo.k.g@gmail.com",
      })
      .expect("Content-type", /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            name: "Testing",
            genre: "Testing",
            time: 12,
            price: "4.99$",
            renter: "raivo.k.g@gmail.com",
          })
        );
      });
  });

  it("POST /rentedMovies ---> validate request body", () => {
    return supertest(app)
      .post("/rentedMovies")
      .send({
        name: "Testing",
        genre: "Testing",
      })
      .expect(422);
  });

  it("PUT /rentedMovies/id/:id ---> update rented movie time by id", () => {
    return supertest(app)
      .put("/rentedMovies/id/3")
      .send({
        time: 24,
      })
      .expect(200);
  });

  it("PUT /rentedMovies/id/:id ---> validate request body", () => {
    return supertest(app)
      .put("/rentedMovies/id/1")
      .send({
        name: 10,
      })
      .expect(422);
  });

  it("PUT /rentedMovies/id/:id ---> validate rented movie id", () => {
    return supertest(app)
      .put("/rentedMovies/id/99999")
      .send({
        time: 24,
      })
      .expect(404);
  });

  it("DELETE /rentedMovies/id/:id ---> delete rented movie by id", () => {
    return supertest(app).delete("/rentedMovies/id/1").expect(200);
  });

  it("DELETE /rentedMovies/id/:id ---> validate rented movie id", () => {
    return supertest(app)
      .delete("/rentedMovies/id/999999")
      .expect(404);
  });
});
