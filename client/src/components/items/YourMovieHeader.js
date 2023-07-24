import classes from "./YourMovieHeader.module.css"

const YourMovieHeader = () => {
  return (
    <div className={classes.container}>
      <p>Name</p>
      <p>Genre</p>
      <p>Time</p>
      <p>Price</p>
    </div>
  );
}

export default YourMovieHeader