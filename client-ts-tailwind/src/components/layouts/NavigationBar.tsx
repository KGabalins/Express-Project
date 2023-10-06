import { useUserContext } from "../contexts/UserContext";
import { Link, Outlet } from "react-router-dom";

export const NavigationBar = () => {
  const { logoutUser, currentUser } = useUserContext();

  return (
    <>
      <h1 className="text-center text-white italic font-bold text-4xl my-5">
        Movie rental
      </h1>
      <ul className="overflow-hidden bg-zinc-700 text-white m-0 p-0 rounded-3xl font-bold">
        <li className="float-left">
          <Link to="/" className=" text-center px-6 py-4 block">
            Home
          </Link>
        </li>
        <li className="float-left">
          <Link to="/yourMovies" className=" text-center px-6 py-4 block">
            Your movies
          </Link>
        </li>
        <li className="float-left">
          <Link to="/profile" className=" text-center px-6 py-4 block">
            Profile
          </Link>
        </li>
        {currentUser?.role === "admin" && (
          <>
            <li className="float-left">
              <Link to="/addMovie" className=" text-center px-6 py-4 block">
                Add movie
              </Link>
            </li>
            <li className="float-left">
              <Link to="/editMovie" className=" text-center px-6 py-4 block">
                Edit movie
              </Link>
            </li>
          </>
        )}
        <li className="float-right">
          <Link
            onClick={logoutUser}
            to="/login"
            className=" text-center px-6 py-4 block"
          >
            Logout
          </Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
};
