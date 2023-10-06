import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

export const ProtectedRoutes = () => {
  const { currentUser, checkUserStatus } = useUserContext();

  useEffect(() => {
    const intervalId = setInterval(checkUserStatus, 60000);

    return () => clearInterval(intervalId);
  });

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};
