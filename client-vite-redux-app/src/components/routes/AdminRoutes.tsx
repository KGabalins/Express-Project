import { Navigate, Outlet } from "react-router-dom";
import useUserContext from "../hooks/useUserContext";

export const AdminRoutes = () => {
  const { currentUser } = useUserContext();

  return currentUser?.role === "admin" ? <Outlet /> : <Navigate to="/" />;
};
