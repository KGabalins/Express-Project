import { useAppDispatch } from "../../app/hooks";
import { userActions } from "../../features/usersSlice";
import { MovieList } from "../lists/MovieList";

export const HomePage = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="page">
      <h2 className="text-2xl text-center font-bold mb-10">Available Movies</h2>
      <button
        onClick={() =>
          dispatch(userActions.createErrorMessage("User is not an admin!"))
        }
      >
        Test
      </button>
      <MovieList />
    </div>
  );
};
