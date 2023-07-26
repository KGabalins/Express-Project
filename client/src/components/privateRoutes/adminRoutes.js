import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLayoutEffect } from "react";

const AdminRoutes = () => {
  const navigate = useNavigate()

  useLayoutEffect(() => {
    axios
      .get("/perm/")
      .then((res) => {
        if (res.data.role !== "admin") {
          navigate("/")
        }
      })
      .catch((err) => {
        console.log(err)
        navigate("/login")
      });
  }, []);

  return <Outlet />
};

export default AdminRoutes;
