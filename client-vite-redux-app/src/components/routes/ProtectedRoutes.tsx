import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { selectCurrentUserStatus } from "../../features/usersSlice";

export const ProtectedRoutes = () => {
  const currentUserStatus = useAppSelector(selectCurrentUserStatus);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUserStatus === "failed") navigate("/login");
  }, [currentUserStatus, navigate]);

  return <Outlet />;
};
