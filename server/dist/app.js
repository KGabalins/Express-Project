import express, { json, urlencoded } from "express";
import movieRoutes from "./routes/movies.js";
import rentedMoviesRoutes from "./routes/rentedMovies.js";
import usersRoutes from "./routes/users.js";
import permissionsRoutes from "./routes/permissions.js";
import cookieParser from "cookie-parser";
import { deserializeUser } from "./middleware/deserializeUser.js";
import dotenv from "dotenv";
dotenv.config();
export function createServer() {
    const app = express();
    app.use(json());
    app.use(cookieParser());
    app.use(urlencoded({ extended: false }));
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
