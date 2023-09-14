import { useEffect, useRef, useState } from "react";
import classes from "./EditMovieItem.module.css";

const EditMovieItem = (props) => {
  const [selectedMovie, setSelectedMovie] = useState({
    name: "",
    genre: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    nameInputRef.current.value = selectedMovie.name;
    genreInputRef.current.value = selectedMovie.genre;
    priceInputRef.current.value = selectedMovie.price;
    stockInputRef.current.value = selectedMovie.stock;
  }, [selectedMovie]);

  const nameInputRef = useRef();
  const genreInputRef = useRef();
  const priceInputRef = useRef();
  const stockInputRef = useRef();

  function editMovieHandler(e) {
    e.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredGenre = genreInputRef.current.value;
    const enteredPrice = Number.parseFloat(priceInputRef.current.value);
    const enteredStock = Number.parseInt(stockInputRef.current.value);

    const editedMovie = {
      name: enteredName,
      genre: enteredGenre,
      price: enteredPrice,
      stock: enteredStock,
    };
    props.onEditMovie(editedMovie);
  }

  function deleteMovieHandler(e) {
    if (!selectedMovie.name) {
      alert("No movie selected");
    } else {
      props.onDeleteMovie(selectedMovie);
      setSelectedMovie({name: "", genre: "", price: "", stock: ""});
    }
  }

  return (
    <form className={classes.form} onSubmit={editMovieHandler} id="editForm">
      <div className={classes.container}>
        <div className={classes.titleContainer}>
          <h2>Edit movie</h2>
        </div>
        <div className={classes.input}>
          <label htmlFor="movies">Movies</label>
          <select
            name="movies"
            onChange={(e) => setSelectedMovie(props.movies[e.target.value])}
          >
            <option></option>
            {props.movies.map((movie, index) => (
              <option value={index} id={movie.id} key={index}>
                {movie.name}
              </option>
            ))}
          </select>
        </div>
        <div className={classes.input}>
          <label htmlFor="nameInput">Name</label>
          <input
            type="text"
            ref={nameInputRef}
            name="nameInput"
            value={selectedMovie.name}
            readOnly
          ></input>
        </div>
        <div className={classes.input}>
          <label htmlFor="genreInput">Genre</label>
          <input
            type="text"
            ref={genreInputRef}
            name="genreInput"
            value={selectedMovie.genre}
            readOnly
          ></input>
        </div>
        <div className={classes.input}>
          <label htmlFor="priceInput">Price</label>
          <input
            type="number"
            ref={priceInputRef}
            name="priceInput"
            step="0.01"
            defaultValue={selectedMovie.price}
          ></input>
        </div>
        <div className={classes.input}>
          <label htmlFor="stockInput">Stock</label>
          <input
            type="number"
            ref={stockInputRef}
            name="stockInput"
            defaultValue={selectedMovie.stock}
          ></input>
        </div>
        <div id="success" className={classes.success}>
          <p></p>
        </div>
        <div className={classes.buttonContainer}>
          <button className={classes.edit}>Edit</button>
          <button
            type="button"
            className={classes.delete}
            onClick={deleteMovieHandler}
          >
            Delete
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditMovieItem;
