import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCurrentUser, userActions } from "../../features/usersSlice";

export const AdminRoutes = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  if (currentUser?.role !== "admin")
    dispatch(userActions.createErrorMessage("User is not an admin!"));

  return currentUser?.role === "admin" ? <Outlet /> : <Navigate to="/" />;
};
