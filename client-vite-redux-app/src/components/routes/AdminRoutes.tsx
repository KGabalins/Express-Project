import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../../features/usersSlice";

export const AdminRoutes = () => {
  const currentUser = useAppSelector(selectCurrentUser);

  return currentUser?.role === "admin" ? <Outlet /> : <Navigate to="/" />;
};
