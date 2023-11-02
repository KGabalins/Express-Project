import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUserError, userActions } from "../../features/usersSlice";
import { useEffect, useState } from "react";
import { selectMoviesError } from "../../features/moviesSlice";
import { selectRentedMoviesError } from "../../features/rentedMoviesSlice";

const ErrorDisplay = () => {
  const [isActive, setIsActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const userError = useAppSelector(selectUserError);
  const moviesError = useAppSelector(selectMoviesError);
  const rentedMoviesError = useAppSelector(selectRentedMoviesError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (moviesError) {
      setIsActive(true);
      setErrorMessage(moviesError);

      const timer1 = setTimeout(() => {
        setIsActive(false);
        dispatch(userActions.clearAllErrors());
      }, 2000);

      return () => {
        clearTimeout(timer1);
      };
    } else if (rentedMoviesError) {
      setIsActive(true);
      setErrorMessage(rentedMoviesError);
      const timer1 = setTimeout(() => {
        setIsActive(false);
        dispatch(userActions.clearAllErrors());
      }, 2000);

      return () => {
        clearTimeout(timer1);
      };
    } else if (userError) {
      setIsActive(true);
      setErrorMessage(userError);
      const timer1 = setTimeout(() => {
        setIsActive(false);
        dispatch(userActions.clearAllErrors());
      }, 2000);

      return () => {
        clearTimeout(timer1);
      };
    }
  }, [userError, moviesError, rentedMoviesError, dispatch]);

  return (
    <>
      <div
        className={`border w-1/4 pointer-events-none transition-all fixed left-1/2 -translate-x-1/2 flex flex-col p-4  rounded-xl bg-red-300 ${
          isActive ? "opacity-90 top-5" : "opacity-0 top-0"
        }`}
      >
        {errorMessage}
      </div>

      <Outlet />
    </>
  );
};

export default ErrorDisplay;
