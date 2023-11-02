import { useEffect, useState } from "react";
import {
  addMovie,
  selectMoviesError,
  selectMoviesStatus,
} from "../../features/moviesSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

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

  const dispatch = useAppDispatch();
  const error = useAppSelector(selectMoviesError);
  const status = useAppSelector(selectMoviesStatus);

  useEffect(() => {
    if (status === "succeeded" && !error) clearForm();
  }, [status, error]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      addMovie({
        ...addMovieFormAttributes,
        price: parseFloat(addMovieFormAttributes.price),
        stock: parseInt(addMovieFormAttributes.stock),
      })
    );
  };

  const canSubmit = () => {
    return Object.values(addMovieFormAttributes).every(Boolean);
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
        Name
        {/* {success && (
          <span className="text-green-700 font-normal">{` - ${success}`}</span>
        )} */}
        {error && (
          <span className="text-red-700 font-normal">{` - ${error.message}`}</span>
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
      <button
        className="bg-zinc-700 text-white rounded-l h-10"
        disabled={!canSubmit()}
      >
        Submit
      </button>
    </form>
  );
};
