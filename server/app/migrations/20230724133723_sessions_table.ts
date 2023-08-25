import { Knex } from "knex"

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex: Knex) {
  return knex.schema.createTable("sessions", (table) => {
    table.increments("sessionId").primary();
    table.string("email").notNullable();
    table.string("name").notNullable();
    table.string("surname");
    table.string("role").notNullable();
    table.boolean("valid").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex: Knex) {
  return knex.schema.dropTable("sessions");
};
