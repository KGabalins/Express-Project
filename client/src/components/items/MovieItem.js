import { useRef } from "react";

import classes from "./MovieItem.module.css";

const MovieItem = (props) => {
  const movieNameRef = useRef();
  const movieGenreRef = useRef();
  const moviePriceRef = useRef();
  const movieStockRef = useRef();

  // Rent submit handler
  function rentMovieHandler(e) {
    e.preventDefault();

    const enteredMovieName = movieNameRef.current.innerText;
    const enteredMovieGenre = movieGenreRef.current.innerText;
    const enteredMoviePrice = moviePriceRef.current.innerText;
    const enteredMovieStock = movieStockRef.current.innerText;

    const rentedMovieData = {
      id: e.target.id,
      name: enteredMovieName,
      genre: enteredMovieGenre,
      price: enteredMoviePrice,
      stock: enteredMovieStock,
      time: 12
    };

    props.onRentMovie(rentedMovieData);
  }

  return (
    <form key={props.id} id={props.id} onSubmit={rentMovieHandler}>
      <div className={classes.container}>
        <div ref={movieNameRef}>{props.name}</div>
        <div ref={movieGenreRef}>{props.genre}</div>
        <div ref={moviePriceRef}>{props.price}</div>
        <div ref={movieStockRef}>
          {" "}
          {props.stock} {props.image}
        </div>
        <button>Rent</button>
      </div>
    </form>
  );
};

export default MovieItem;
