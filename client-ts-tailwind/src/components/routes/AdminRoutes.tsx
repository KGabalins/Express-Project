import { useUserContext } from "../contexts/UserContext";
import { Navigate, Outlet } from "react-router-dom";

export const AdminRoutes = () => {
  const { currentUser } = useUserContext();

  return currentUser?.role === "admin" ? <Outlet /> : <Navigate to="/" />;
};
