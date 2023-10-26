import { Outlet, Navigate } from "react-router-dom";
import useUserContext from "../hooks/useUserContext";

export const GuestRoutes = () => {
  const { currentUser } = useUserContext();

  return !currentUser ? <Outlet /> : <Navigate to="/" />;
};
