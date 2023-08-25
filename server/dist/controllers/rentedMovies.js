import { RentedMovie } from "../models/rentedMovies.js";
import Movie from "../models/movies.js";
import { User } from "../models/users.js";
// import moviesController from "../controllers/movies.js";
export const getMyMovies = async (req, res) => {
    const { email } = req.user;
    try {
        // Get all rented movies by renter email
        const myMovies = await RentedMovie.findAll({ where: { renter: email } });
        return res.status(200).json(myMovies);
    }
    catch (error) {
        return res.status(500).send({ message: error.message });
    }
};
export const getMoviesByEmail = async (req, res) => {
    const email = req.params.email;
    try {
        // Check if user exists
        const userExists = await User.get(email);
        if (!userExists) {
            return res.status(404).json({ message: "User doesn't exist!" });
        }
        try {
            // Get rented movies by email
            const movies = await RentedMovie.findAll({
                where: { renter: email },
            });
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
export const getMovieById = async (req, res) => {
    const id = parseFloat(req.params.id);
    // Validate parameter
    if (!Number.isInteger(id)) {
        return res.status(400).json({ message: "Invalid id!" });
    }
    try {
        // Get rented movie by id
        const rentedMovie = await RentedMovie.findOne({
            where: { id },
        });
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
export const addMovie = async (req, res) => {
    const name = req.params.name;
    try {
        // Check if movie exists and if stock is available
        const movie = await Movie.findOne({ where: { name } });
        if (!movie) {
            return res.status(404).json({ message: "Movie does not exist!" });
        }
        else if (movie.stock <= 0) {
            return res.status(409).json({ message: "Movie is out of stock!" });
        }
        try {
            // Update movie stock
            await Movie.update({ stock: movie.stock - 1 }, { where: { name: movie.name } });
            try {
                // Create a rented movie
                const rentedMovie = await RentedMovie.create({
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
export const updateTime = async (req, res) => {
    const { email } = req.user;
    const id = parseFloat(req.params.id);
    const method = req.body.method;
    // Validate parameter
    if (!Number.isInteger(id)) {
        return res.status(400).json({ message: "Invalid id!" });
    }
    // Validate request parameters
    if (!method || (method !== "+" && method !== "-")) {
        return res.status(422).json({ message: "Invalid request body!" });
    }
    try {
        // Check if rented movie exists
        const rentedMovie = await RentedMovie.findOne({
            where: { id },
        });
        if (!rentedMovie) {
            return res.status(404).json({ message: "No rented movie found" });
        }
        const currTime = rentedMovie.time;
        // Check if the rented movie's renter is the current user
        if (rentedMovie.renter !== email) {
            return res.status(403).json({ message: "You do not rent this movie!" });
        }
        // If the method is "+" and the rented movie's time is less than 168
        if (method === "+" && currTime < 168) {
            try {
                // Update rented movie time
                await RentedMovie.update({ time: currTime + 12 }, { where: { id } });
                return res.status(200).json({ message: "Movie time updated" });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
            // If the method is "-" and the rented movie's time is more than 0
        }
        else if (method === "-" && currTime > 0) {
            try {
                // Update rented movie time
                await RentedMovie.update({ time: currTime - 12 }, { where: { id } });
                return res.status(200).json({ message: "Movie time updated" });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
            // If the rented movie's time is either at its maximum or minimum
        }
        else {
            return res
                .status(409)
                .json({
                message: "Rented movie's time has reached its maximum or minimum!",
            });
        }
    }
    catch (error) {
        return res.status(500).send({ message: error.message });
    }
};
export const deleteMovie = async (req, res) => {
    const { email } = req.user;
    const id = parseFloat(req.params.id);
    // Validate parameter
    if (!Number.isInteger(id)) {
        return res.status(400).json({ message: "Invalid id!" });
    }
    try {
        // Check if rented movie exists
        const rentedMovie = await RentedMovie.findOne({
            where: { id },
        });
        if (!rentedMovie) {
            return res.status(404).json({ message: "Movie does not exist!" });
        }
        // Check if rented movie's renter is the current user
        if (rentedMovie.renter !== email) {
            return res.status(403).json({ message: "You do not rent this movie!" });
        }
        try {
            // Delete rented movie
            await RentedMovie.destroy({ where: { id } });
            try {
                // Check if the rented movie still exists in movies
                const movie = await Movie.findOne({
                    where: { name: rentedMovie.name },
                });
                if (!movie) {
                    return res.status(200).json({ message: "Movie deleted" });
                }
                try {
                    // If the movie still exists in movies, update its stock
                    await Movie.update({ stock: movie.stock + 1 }, { where: { name: movie.name } });
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
