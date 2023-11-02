import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectUserStatus } from "../../features/usersSlice";

export const ProtectedRoutes = () => {
  const currentUserStatus = useAppSelector(selectUserStatus);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUserStatus === "failed") navigate("/login");
  }, [currentUserStatus, navigate]);

  return <Outlet />;
};
