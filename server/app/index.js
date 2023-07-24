const express = require("express");
const movieRoutes = require("./routes/movies");
const rentedMoviesRoutes = require("./routes/rentedMovies");
const usersRoutes = require("./routes/users");
const expressWinston = require("express-winston");
const { transports, format } = require("winston");
const postgresdb = require("./config/postgres");
const cookieParser = require("cookie-parser");
const { deserializeUser } = require("./middleware/deserializeUser");
require("dotenv").config();

// Test DB
postgresdb
  .authenticate()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Error: " + err));

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(deserializeUser);

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

app
  .use("/movies", movieRoutes)
  .use("/rentedMovies", rentedMoviesRoutes)
  .use("/users", usersRoutes);

try {
  app.listen(process.env.PORT || 5000, () =>
    console.log(`Server running on port ${process.env.PORT || 5000}`)
  );
} catch (error) {
  console.error(error);
}

module.exports = app;
