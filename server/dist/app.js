import express, { json, urlencoded } from "express";
import movieRoutes from "./routes/movie.routes.js";
import rentedMoviesRoutes from "./routes/rentedMovie.routes.js";
import usersRoutes from "./routes/user.routes.js";
import permissionsRoutes from "./routes/permission.routes.js";
import expressWinston from "express-winston";
import { transports, format } from "winston";
import cookieParser from "cookie-parser";
import { deserializeUser } from "./middleware/deserializeUser.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
export default function createServer() {
    const corsOptions = {
        origin: "http://localhost:3000",
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        optionsSuccessStatus: 204,
    };
    const app = express();
    app.use(cors(corsOptions));
    app.use(json());
    app.use(cookieParser());
    app.use(urlencoded({ extended: false }));
    app.use(deserializeUser);
    app.use(expressWinston.logger({
        transports: [new transports.Console()],
        format: format.combine(format.json(), format.timestamp(), format.prettyPrint()),
        statusLevels: true,
    }));
    app
        .use("/movies", movieRoutes)
        .use("/rentedMovies", rentedMoviesRoutes)
        .use("/users", usersRoutes)
        .use("/perm", permissionsRoutes);
    return app;
}
