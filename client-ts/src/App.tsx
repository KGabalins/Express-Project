import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./components/pages/HomePage";
import { UserContextProvider } from "./components/contexts/UserContextProvider";
import { LoginPage } from "./components/pages/LoginPage";
import { NavigationBar } from "./components/layouts/NavigationBar";
import { ProtectedRoutes } from "./components/routes/ProtectedRoutes";
import "./components/styles/Main.css";
import { GuestRoutes } from "./components/routes/GuestRoutes";
import { RentedMoviesPage } from "./components/pages/RentedMoviesPage";
import { ProfilePage } from "./components/pages/ProfilePage";
import { MovieContextProvider } from "./components/contexts/MovieContextProvider";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserContextProvider />}>
          <Route element={<ProtectedRoutes />}>
            <Route element={<MovieContextProvider />}>
              <Route element={<NavigationBar />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/yourMovies" element={<RentedMoviesPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Route>
          </Route>
          <Route element={<GuestRoutes />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
