import MovieItem from "../items/MovieItem";
import MovieItemHeader from "../items/MovieItemHeader";

import classes from "./AvailableMoviesList.module.css"

const AvailableMoviesList = (props) => {
  return (
    <>
      <MovieItemHeader />
      {props.movies.map((movie, index) => (
        <MovieItem
          key={index}
          id={movie.id}
          name={movie.name}
          genre={movie.genre}
          price={movie.price}
          stock={movie.stock}
          image={
            +movie.stock > 0 ? (
              <img src={require("../icons/check.png")} className={classes.stockIcon} alt="checkIcon" />
            ) : (
              <img src={require("../icons/cross.png")} className={classes.stockIcon} alt="crossIcon"/>
            )
          }
          onRentMovie={props.onRentMovie}
        />
      ))}
    </>
  );
};

export default AvailableMoviesList;
