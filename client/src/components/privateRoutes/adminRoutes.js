import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const AdminRoutes = () => {
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("/users")
      .then((res) => {
        if (res.data.role !== "admin") {
          navigate("/")
        }
      })
      .catch(() => {
        navigate("/login")
      });
  }, [navigate]);

  return <Outlet />
};

export default AdminRoutes;
