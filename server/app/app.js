const express = require("express");
const movieRoutes = require("./routes/movies");
const rentedMoviesRoutes = require("./routes/rentedMovies");
const usersRoutes = require("./routes/users");
const permissionsRoutes = require("./routes/permissions");
const expressWinston = require("express-winston");
const { transports, format } = require("winston");
const cookieParser = require("cookie-parser");
const { deserializeUser } = require("./middleware/deserializeUser");
require("dotenv").config();

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: false }));
  app.use(deserializeUser);

  // app.use(
  //   expressWinston.logger({
  //     transports: [new transports.Console()],
  //     format: format.combine(
  //       format.json(),
  //       format.timestamp(),
  //       format.prettyPrint()
  //     ),
  //     statusLevels: true,
  //   })
  // );

  app
    .use("/movies", movieRoutes)
    .use("/rentedMovies", rentedMoviesRoutes)
    .use("/users", usersRoutes)
    .use("/perm", permissionsRoutes);

  return app;
}

module.exports = { createServer };
