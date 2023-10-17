import axios from "axios";

const removeRentedMovie = async (id: number) => {
  try {
    await axios.delete(`api/rentedMovies/id/${id}`);
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

const changeRentedMovieTime = async (id: number, method: "+" | "-") => {
  try {
    await axios.put(`api/rentedMovies/id/${id}`, { method });
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export { removeRentedMovie, changeRentedMovieTime };
