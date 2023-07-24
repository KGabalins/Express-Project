import { Link, useNavigate } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

// Main navigation bar
function MainNavigation() {

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
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
