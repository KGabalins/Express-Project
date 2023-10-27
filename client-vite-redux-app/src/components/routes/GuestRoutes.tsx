import { Outlet, Navigate } from "react-router-dom";
import { selectCurrentUser } from "../../features/usersSlice";
import { useAppSelector } from "../../app/hooks";

export const GuestRoutes = () => {
  const currentUser = useAppSelector(selectCurrentUser);

  return !currentUser ? <Outlet /> : <Navigate to="/" />;
};
