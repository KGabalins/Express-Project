import { useUserContext } from "../contexts/UserContext";
import { Outlet, Navigate } from "react-router-dom";

export const GuestRoutes = () => {
  const { currentUser } = useUserContext();

  return !currentUser ? <Outlet /> : <Navigate to="/" />;
};
