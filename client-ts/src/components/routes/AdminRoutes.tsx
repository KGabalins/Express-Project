import {useContext} from "react"
import { UserContext } from "../contexts/UserContext";
import { Navigate, Outlet } from "react-router-dom";

export const AdminRoutes = () => {
  const { currentUser } = useContext(UserContext);

  return currentUser?.role === "admin" ? <Outlet /> : <Navigate to="/" />;
}