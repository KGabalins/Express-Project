import { useContext, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export const ProtectedRoutes = () => {
  const { currentUser, checkUserStatus } = useContext(UserContext);

  useEffect(() => {
    const intervalId = setInterval(checkUserStatus, 60000)

    return () => clearInterval(intervalId)
  })

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};
