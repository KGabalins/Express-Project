import { useState } from "react";
import axiosInstance from "../configs/AxiosConfig";
import { useMovieContext } from "../contexts/MovieContext";

type AddMovieFormAttributes = {
  name: string;
  genre: string;
  price: string;
  stock: string;
};

export const AddMovieForm = () => {
  const [addMovieFormAttributes, setAddMovieFormAttributes] =
    useState<AddMovieFormAttributes>({
      name: "",
      genre: "",
      price: "",
      stock: "",
    });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const { refreshMovies } = useMovieContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axiosInstance
      .post(`/movies`, {
        ...addMovieFormAttributes,
        price: parseFloat(addMovieFormAttributes.price),
        stock: parseInt(addMovieFormAttributes.stock),
      })
      .then(() => {
        setSuccess("Movie added successfully!");
        setError("");
        clearForm();
        refreshMovies();
      })
      .catch((error: any) => {
        setSuccess("");
        if (Array.isArray(error.response.data)) {
          setError(error.response.data[0].message);
        } else {
          setError(error.response.data.message);
        }
      });
  };

  const clearForm = () => {
    setAddMovieFormAttributes({
      name: "",
      genre: "",
      price: "",
      stock: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddMovieFormAttributes((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label htmlFor="movieName" className="font-bold">
        Name{" "}
        {success && (
          <span className="text-green-700 font-normal">{` - ${success}`}</span>
        )}{" "}
        {error && (
          <span className="text-red-700 font-normal">{` - ${error}`}</span>
        )}
      </label>
      <input
        type="text"
        id="movieName"
        placeholder="e.g. Batman"
        name="name"
        className="bg-neutral-300 rounded-lg p-2 mb-4"
        value={addMovieFormAttributes.name}
        onChange={handleChange}
      />
      <label htmlFor="movieGenre" className="font-bold">
        Genre
      </label>
      <input
        type="text"
        id="movieGenre"
        placeholder="e.g. Action"
        name="genre"
        className="bg-neutral-300 rounded-lg p-2 mb-4"
        value={addMovieFormAttributes.genre}
        onChange={handleChange}
      />
      <label htmlFor="moviePrice" className="font-bold">
        Price
      </label>
      <input
        type="number"
        id="moviePrice"
        min={0.01}
        step={0.01}
        placeholder="e.g. 3.99"
        name="price"
        className="bg-neutral-300 rounded-lg p-2 mb-4"
        value={addMovieFormAttributes.price}
        onChange={handleChange}
      />
      <label htmlFor="movieStock" className="font-bold">
        Stock
      </label>
      <input
        type="number"
        id="movieStock"
        placeholder="e.g. 24"
        name="stock"
        className="bg-neutral-300 rounded-lg p-2 mb-4"
        min={0}
        step={1}
        value={addMovieFormAttributes.stock}
        onChange={handleChange}
      />
      <button className="bg-zinc-700 text-white rounded-l h-10">Submit</button>
    </form>
  );
};
