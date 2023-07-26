import { Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import YourMoviesPage from "./components/pages/YourMoviesPage";
import LoginPage from "./components/pages/LoginPage";
import Layout from "./components/layout/Layout";
import ProfilePage from "./components/pages/ProfilePage";
// import { PrivateRoute } from "./components/privateRoutes/PrivateRoutes";
import AddMoviesPage from "./components/pages/AddMoviesPage";
import AdminRoutes from "./components/privateRoutes/adminRoutes";
import DeleteMoviePage from "./components/pages/EditMoviePage";
import EditMoviePage from "./components/pages/EditMoviePage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/yourMovies" element={<YourMoviesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route element={<AdminRoutes />}>
            <Route path="/addMovies" element={<AddMoviesPage />} />
            <Route path="/editMovie" element={<EditMoviePage />} />
          </Route>
        </Route>

        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
