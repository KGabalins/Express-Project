import Footer from "./Footer";
import MainNavigation from "./MainNavigation";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <h1 className="page-title">Movie rental</h1>
      <MainNavigation />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
