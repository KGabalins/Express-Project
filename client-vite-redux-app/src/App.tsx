import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./components/pages/HomePage";
import { LoginPage } from "./components/pages/LoginPage";
import { NavigationBar } from "./components/layouts/NavigationBar";
import { ProtectedRoutes } from "./components/routes/ProtectedRoutes";
import { GuestRoutes } from "./components/routes/GuestRoutes";
import { RentedMoviesPage } from "./components/pages/RentedMoviesPage";
import { ProfilePage } from "./components/pages/ProfilePage";
import { AddMoviePage } from "./components/pages/AddMoviePage";
import { EditMoviePage } from "./components/pages/EditMoviePage";
import { AdminRoutes } from "./components/routes/AdminRoutes";
import { useAppDispatch } from "./app/hooks";
import { useEffect } from "react";
import { fetchUser } from "./features/usersSlice";
import ErrorDisplay from "./components/layouts/ErrorDisplay";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ErrorDisplay />}>
          <Route element={<ProtectedRoutes />}>
            <Route element={<NavigationBar />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/yourMovies" element={<RentedMoviesPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route element={<AdminRoutes />}>
                <Route path="/addMovie" element={<AddMoviePage />} />
                <Route path="/editMovie" element={<EditMoviePage />} />
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
