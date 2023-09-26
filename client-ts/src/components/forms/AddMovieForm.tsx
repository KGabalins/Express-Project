import { useState, useContext } from "react";
import axiosInstance from "../configs/AxiosConfig";
import { MovieContext } from "../contexts/MovieContext";

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

  const { refreshMovies } = useContext(MovieContext);

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

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="movieName">
        Name {success && <span className="successText">{` - ${success}`}</span>}{" "}
        {error && <span className="errorText">{` - ${error}`}</span>}
      </label>
      <input
        type="text"
        id="movieName"
        placeholder="e.g. Batman"
        value={addMovieFormAttributes.name}
        onChange={(e) =>
          setAddMovieFormAttributes((prevState) => {
            return { ...prevState, name: e.target.value };
          })
        }
      />
      <label htmlFor="movieGenre">Genre</label>
      <input
        type="text"
        id="movieGenre"
        placeholder="e.g. Action"
        value={addMovieFormAttributes.genre}
        onChange={(e) =>
          setAddMovieFormAttributes((prevState) => {
            return { ...prevState, genre: e.target.value };
          })
        }
      />
      <label htmlFor="moviePrice">Price</label>
      <input
        type="number"
        id="moviePrice"
        min={0.01}
        step={0.01}
        placeholder="e.g. 3.99"
        value={addMovieFormAttributes.price}
        onChange={(e) =>
          setAddMovieFormAttributes((prevState) => {
            return { ...prevState, price: e.target.value };
          })
        }
      />
      <label htmlFor="movieStock">Stock</label>
      <input
        type="number"
        id="movieStock"
        placeholder="e.g. 24"
        min={0}
        step={1}
        value={addMovieFormAttributes.stock}
        onChange={(e) =>
          setAddMovieFormAttributes((prevState) => {
            return { ...prevState, stock: e.target.value };
          })
        }
      />
      <div className="buttonDiv">
        <button className="okButton">Submit</button>
      </div>
    </form>
  );
};
