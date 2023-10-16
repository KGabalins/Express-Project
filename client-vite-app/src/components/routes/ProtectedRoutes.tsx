import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { checkUserStatus, useUserContext } from "../contexts/UserContext";

export const ProtectedRoutes = () => {
  const { currentUser, setCurrentUser } = useUserContext();

  useEffect(() => {
    const intervalId = setInterval(() => {
      checkUserStatus(currentUser, setCurrentUser);
    }, 60000);

    return () => clearInterval(intervalId);
  });

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};
