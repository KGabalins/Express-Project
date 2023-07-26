import { Link, useNavigate } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";

// Main navigation bar
function MainNavigation() {
  const [currUser, setCurrUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/users")
      .then((resp) => {
        setCurrUser(resp.data);
      })
      .catch((err) => {
        console.log(err);
        navigate("/login", { replace: true });
      });
  }, []);

  function logoutHandler() {
    axios
      .delete("/users/logout")
      .then(() => {
        navigate("/login", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/yourMovies">Your movies</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          {currUser.role === "admin" && (
            <>
              <li>
                <Link to="/addMovies">Add movie</Link>
              </li>
              <li>
                <Link to="/editMovie">Edit movie</Link>
              </li>
            </>
          )}
          <li className={classes.logout}>
            <Link onClick={logoutHandler}>Logout</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
