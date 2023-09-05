import db from "./config/postgres.js";
import { swaggerDocs } from "./utils/swagger.js";
import { createServer } from "./app.js";
import dotenv from "dotenv";
dotenv.config();
// const app = require("./app");
// Test DB
db.authenticate()
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.log("Error: " + err));
const app = createServer();
app.listen(process.env.PORT || 5000, () => console.log(`Server running on port ${process.env.PORT || 5000}`));
swaggerDocs(app, process.env.PORT || 5000);
