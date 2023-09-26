import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link, Outlet } from "react-router-dom";
import "../styles/NavigationBar.css";

export const NavigationBar = () => {
  const { logoutUser, currentUser } = useContext(UserContext);

  return (
    <>
      <h1 className="appTitle">Movie rental</h1>
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
        {currentUser?.role === "admin" && (
          <>
            <li>
              <Link to="/addMovie">Add movie</Link>
            </li>
            <li>
              <Link to="/editMovie">Edit movie</Link>
            </li>
          </>
        )}
        <li className="logoutLink">
          <Link onClick={logoutUser} to="/login">
            Logout
          </Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
};
