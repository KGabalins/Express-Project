import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Outlet, Navigate } from "react-router-dom";

export const GuestRoutes = () => {
  const { currentUser } = useContext(UserContext);

  return !currentUser ? <Outlet /> : <Navigate to="/" />;
};
