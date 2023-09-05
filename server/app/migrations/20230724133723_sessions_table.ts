import { Knex } from "knex"

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex: Knex) {
  return knex.schema.createTable("sessions", (table) => {
    table.increments("sessionId").primary();
    table.string("email").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex: Knex) {
  return knex.schema.dropTable("sessions");
};
