const express = require("express");
const movieRoutes = require("./routes/movies");
const expressWinston = require("express-winston");
const { transports, format } = require("winston");
const db = require("./utils/database");
require("dotenv").config();

// Test DB
db.authenticate().then(() => console.log("Database connected successfully")).catch(err => console.log("Error: " + err));

const app = express();

app.use(express.json());
app.use(
  expressWinston.logger({
    transports: [new transports.Console()],
    format: format.combine(
      format.json(),
      format.timestamp(),
      format.prettyPrint()
    ),
  })
);

app.use("/movies", movieRoutes);

try {
  app.listen(process.env.PORT || 5000, () =>
    console.log(`Server running on port ${process.env.PORT || 5000}`)
  );
} catch (error) {
  console.error(error);
}

module.exports = app;