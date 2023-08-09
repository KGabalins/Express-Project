import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const UserRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/users/isLoggedIn").then((response) => {
      const isLoggedIn = response.data.isLoggedIn;
      if (!isLoggedIn) {
        navigate("/login", { replace: true });
      }
    });
  }, [navigate]);

  return <Outlet />;
};

export default UserRoutes;
