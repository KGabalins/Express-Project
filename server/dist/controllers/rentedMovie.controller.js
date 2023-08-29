import { User } from "../models/users.js";
import { addRentedMovie, getRentedMovieById, getRentedMoviesByEmail, removeRentedMovie, updateRentedMovie } from "../service/rentedMovie.service.js";
import { getMovieByName, updateMovie } from "../service/movie.service.js";
export const getCurrentUserRentedMoviesHandler = async (req, res) => {
    const { email } = req.user;
    try {
        // Get all rented movies by renter email
        const rentedMovies = await getRentedMoviesByEmail(email);
        return res.status(200).json(rentedMovies);
    }
    catch (error) {
        return res.status(500).send({ message: error.message });
    }
};
export const getRentedMoviesByEmailHandler = async (req, res) => {
    const email = req.params.email;
    try {
        // Check if user exists
        const userExists = await User.get(email);
        if (!userExists) {
            return res.status(404).json({ message: "User doesn't exist!" });
        }
        try {
            // Get rented movies by email
            const movies = await getRentedMoviesByEmail(email);
            return res.status(200).json(movies);
        }
        catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }
    catch (error) {
        return res.status(500).send({ message: error.message });
    }
};
export const getRentedMovieByIdHandler = async (req, res) => {
    const id = parseFloat(req.params.id);
    // Validate parameter
    if (!Number.isInteger(id)) {
        return res.status(400).json({ message: "Invalid id!" });
    }
    try {
        // Get rented movie by id
        const rentedMovie = await getRentedMovieById(id);
        // Check if rented movie exists
        if (!rentedMovie) {
            return res.status(404).json({ message: "No movie found" });
        }
        return res.status(200).json(rentedMovie);
    }
    catch (error) {
        return res.status(500).send({ message: error.message });
    }
};
export const addRentedMovieHandler = async (req, res) => {
    const name = req.params.name;
    try {
        // Check if movie exists and if stock is available
        const movie = await getMovieByName(name);
        if (!movie) {
            return res.status(404).json({ message: "Movie does not exist!" });
        }
        else if (movie.stock <= 0) {
            return res.status(409).json({ message: "Movie is out of stock!" });
        }
        try {
            // Update movie stock
            movie.stock -= 1;
            await updateMovie(name, movie.dataValues);
            try {
                // Create a rented movie
                const rentedMovie = await addRentedMovie({
                    name: movie.name,
                    genre: movie.genre,
                    time: 12,
                    price: movie.price,
                    renter: req.user.email,
                });
                return res.status(201).json(rentedMovie);
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        }
        catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }
    catch (error) {
        return res.status(500).send({ message: error.message });
    }
};
export const updateRentedMovieTimeHandler = async (req, res) => {
    const { email } = req.user;
    const id = Number.parseInt(req.params.id);
    const method = req.body.method;
    // Validate parameter
    if (!Number.isInteger(id)) {
        return res.status(400).json({ message: "Invalid id!" });
    }
    try {
        // Check if rented movie exists
        const rentedMovie = await getRentedMovieById(id);
        if (!rentedMovie) {
            return res.status(404).send({ message: "No rented movie found!" });
        }
        // Check if renter is the same as current user
        if (rentedMovie.renter !== email) {
            return res.status(403).send({ message: "You do not own this movie!" });
        }
        // Check if time is not over or under limit
        if (method === "+" && rentedMovie.time < 168) {
            rentedMovie.time += 12;
        }
        else if (method === "-" && rentedMovie.time > 0) {
            rentedMovie.time -= 12;
        }
        else {
            return res.status(409).send({ message: "Time has reached its limit!" });
        }
        try {
            // Update rented movie's time
            await updateRentedMovie(id, rentedMovie.dataValues);
            return res.status(200).send({ message: "Time updated successfully!" });
        }
        catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }
    catch (error) {
        return res.status(500).send({ message: error.message });
    }
};
export const removeRentedMovieHandler = async (req, res) => {
    const { email } = req.user;
    const id = Number.parseInt(req.params.id);
    // Validate parameter
    if (!Number.isInteger(id)) {
        return res.status(400).json({ message: "Invalid id!" });
    }
    try {
        // Check if rented movie exists
        const rentedMovie = await getRentedMovieById(id);
        if (!rentedMovie) {
            return res.status(404).json({ message: "Movie does not exist!" });
        }
        // Check if rented movie's renter is the current user
        if (rentedMovie.renter !== email) {
            return res.status(403).json({ message: "You do not rent this movie!" });
        }
        try {
            // Delete rented movie
            await removeRentedMovie(id);
            try {
                // Check if the rented movie still exists in movies
                const movie = await getMovieByName(rentedMovie.name);
                if (!movie) {
                    return res.status(200).json({ message: "Movie deleted" });
                }
                try {
                    // If the movie still exists in movies, update its stock
                    movie.stock += 1;
                    await updateMovie(movie.name, movie.dataValues);
                    return res.status(200).json({ message: "Movie deleted" });
                }
                catch (error) {
                    return res.status(500).send({ message: error.message });
                }
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        }
        catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }
    catch (error) {
        return res.status(500).send({ message: error.message });
    }
};