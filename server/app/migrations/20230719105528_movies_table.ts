import { Knex } from "knex";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex: Knex) {
  return knex.schema
    .createTable("movies", (table) => {
      table.increments("id").primary();
      table.string("name").unique().notNullable();
      table.string("genre").notNullable();
      table.float("price").notNullable();
      table.integer("stock").notNullable();
    })
    .then(() => {
      return knex("movies").insert([
        { name: "Batman", genre: "Action", price: 4.99, stock: 12 },
        { name: "The Godfather", genre: "Thriller", price: 3.99, stock: 4 },
        {
          name: "The Dark Knight",
          genre: "Action and adventure",
          price: 5.99,
          stock: 2,
        },
        { name: "Jaws", genre: "Aciton", price: 2.99, stock: 9 },
        {
          name: "Star Wars",
          genre: "Science Fiction",
          price: 7.99,
          stock: 8,
        },
        { name: "Toy Story", genre: "Animation", price: 4.99, stock: 3 },
        {
          name: "Die Hard",
          genre: "Action and adventure",
          price: 3.99,
          stock: 5,
        },
        { name: "Boyhood", genre: "Drama", price: 5.99, stock: 4 },
      ]);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// exports.down = function (knex: Knex) {
//   return knex.schema.dropTable("movies");
// };


export const down = function (knex: Knex) {
  return knex.schema.dropTable("movies");
};
