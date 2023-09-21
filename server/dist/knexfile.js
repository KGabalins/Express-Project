// Update with your config settings.
// require("dotenv").config({path: "../.env"});
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export const development = {
    client: "postgresql",
    connection: {
        host: process.env.PGHOST,
        port: process.env.PGPORT,
        database: process.env.PGDATABASE,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
    },
};
