require("dotenv").config();
// const app = require("./app");
const postgresdb = require("./config/postgres");
const { swaggerDocs } = require("./utils/swagger");
const { createServer } = require("./app");

// Test DB
postgresdb
  .authenticate()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Error: " + err));

const app = createServer();

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);

swaggerDocs(app, process.env.PORT || 5000);

// try {
//   app.listen(process.env.PORT || 5000, () =>
//     console.log(`Server running on port ${process.env.PORT || 5000}`)
//   );

//   swaggerDocs(app, process.env.PORT || 5000);
// } catch (error) {
//   console.error(error);
// }
