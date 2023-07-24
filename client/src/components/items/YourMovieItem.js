import { useRef } from "react";

import classes from "./YourMovieItem.module.css";

const YourMovieItem = (props) => {
  const movieNameRef = useRef();
  const movieGenreRef = useRef();
  const moviePriceRef = useRef();
  const movieTimeRef = useRef();

  function removeMovieHandler(e) {
    e.preventDefault();

    const enteredMovieName = movieNameRef.current.innerText;
    const enteredMovieGenre = movieGenreRef.current.innerText;
    const enteredMoviePrice = moviePriceRef.current.innerText;

    const removedMovieData = {
      id: e.target.id,
      name: enteredMovieName,
      genre: enteredMovieGenre,
      price: enteredMoviePrice,
    };

    props.onRemoveMovie(removedMovieData);
  }

  function changeTimehandler(e) {
    e.preventDefault()
    props.onChangeTime(e.target.id)
  }

  return (
    <form key={props.id} id={props.id} onSubmit={removeMovieHandler}>
      <div className={classes.container}>
        <div ref={movieNameRef}>{props.name}</div>
        <div ref={movieGenreRef}>{props.genre}</div>
        <div>
          <button type="button" id={props.id + "-"} className={classes.timeButton} onClick={changeTimehandler}>&lt;</button>
          <input type="text" ref={movieTimeRef} value={props.time} className={classes.time} readOnly />
          <button type="button" id={props.id + "+"} className={classes.timeButton} onClick={changeTimehandler}>&gt;</button>
        </div>
        <div ref={moviePriceRef}>{props.price}</div>
        <button type="submit" className={classes.removeButton}>Remove</button>
      </div>
    </form>
  );
};

export default YourMovieItem;
