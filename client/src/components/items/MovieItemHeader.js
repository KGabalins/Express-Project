import classes from "./MovieItemHeader.module.css";

const MovieItemHeader = () => {
  return (
    <div className={classes.container}>
      <p>Name</p>
      <p>Genre</p>
      <p>Price</p>
      <p>Stock</p>
    </div>
  );
};

export default MovieItemHeader;
