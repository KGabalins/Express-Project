import { useRef } from "react";
import classes from "./AddMovieItem.module.css";
import axios from "axios";

const AddMovieItem = () => {
  const nameInputRef = useRef();
  const genreInputRef = useRef();
  const priceInputRef = useRef();
  const stockInputRef = useRef();

  function addMovieHandler(e) {
    e.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredGenre = genreInputRef.current.value;
    const enteredPrice = priceInputRef.current.value + "$";
    const enteredStock = stockInputRef.current.value;

    axios
      .post("/movies", {
        name: enteredName,
        genre: enteredGenre,
        price: enteredPrice,
        stock: enteredStock,
      })
      .then(
        e.target.reset(), 
        // e.target.children[0].children["success"].style.display = "inline-block"
        document.getElementById("success").style.display = "inline-block"
        );
  }

  return (
    <form className={classes.form} onSubmit={addMovieHandler}>
      <div className={classes.container}>
        <div className={classes.titleContainer}>
          <h2>Add movie</h2>
        </div>
        <div className={classes.input}>
          <label htmlFor="nameInput">Name</label>
          <input type="text" ref={nameInputRef} name="nameInput"></input>
        </div>
        <div className={classes.input}>
          <label htmlFor="genreInput">Genre</label>
          <input type="text" ref={genreInputRef} name="genreInput"></input>
        </div>
        <div className={classes.input}>
          <label htmlFor="priceInput">Price</label>
          <input
            type="number"
            ref={priceInputRef}
            name="priceInput"
            step="0.01"
          ></input>
        </div>
        <div className={classes.input}>
          <label htmlFor="stockInput">Stock</label>
          <input type="number" ref={stockInputRef} name="stockInput"></input>
        </div>
        <div id="success" className={classes.success}>
          <p>Movie has been successfully added!</p>
        </div>
        <div className={classes.buttonContainer}>
          <button>Submit</button>
        </div>
      </div>
    </form>
  );
};

export default AddMovieItem;
