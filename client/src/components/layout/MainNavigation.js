import { Link, useNavigate } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

// Main navigation bar
function MainNavigation() {
  const [currUser, setCurrUser] = useState({});
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    getUserData();
  });

  const getUserData = () => {
    axios
      .get("/users")
      .then((response) => {
        console.log(response.data);
        setCurrUser(response.data);
      }).catch(error => {
        console.log(error);
        localStorage.clear();
        // navigate("/login", {replace: true});
      }

      );
  };

  function LogoutUser() {
    localStorage.removeItem("token");
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
          <li className={classes.logout}>
            <Link onClick={LogoutUser} to="/login">
              Logout
            </Link>
          </li>
          {currUser.role === "admin" && (
            <li>
              <Link to="/addMovies">Add movie</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
