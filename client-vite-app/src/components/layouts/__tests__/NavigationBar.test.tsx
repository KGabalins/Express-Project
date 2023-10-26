import { render, screen } from "@testing-library/react";
import { UserContext, UserType } from "../../contexts/UserContext";
import { NavigationBar } from "../NavigationBar";
import { BrowserRouter } from "react-router-dom";
import * as utils from "../../utils/userFunctions";
import user from "@testing-library/user-event";

const mockUser: UserType = {
  name: "mock name",
  surname: "mock surname",
  email: "mock@example.com",
  role: "user",
};
const mockAdmin: UserType = {
  name: "mock name",
  surname: "mock surname",
  email: "mock@example.com",
  role: "admin",
};

vitest.mock("../utils/userFunctions.tsx");

describe("Navigation bar", () => {
  test("renders correctly with user", () => {
    render(
      <BrowserRouter>
        <UserContext.Provider
          value={{
            setCurrentUser: vitest.fn(),
            refreshUsers: () => {},
            currentUser: mockUser,
          }}
        >
          <NavigationBar />
        </UserContext.Provider>
      </BrowserRouter>
    );

    const headingElement = screen.getByRole("heading");
    expect(headingElement).toBeInTheDocument();

    const homeLink = screen.getByRole("link", { name: "Home" });
    expect(homeLink).toBeInTheDocument();

    const yourMoviesLink = screen.getByRole("link", { name: "Your movies" });
    expect(yourMoviesLink).toBeInTheDocument();

    const profileLink = screen.getByRole("link", { name: "Profile" });
    expect(profileLink).toBeInTheDocument();

    const logoutLink = screen.getByRole("link", { name: "Logout" });
    expect(logoutLink).toBeInTheDocument();
  });

  test("renders correctly with admin", () => {
    render(
      <BrowserRouter>
        <UserContext.Provider
          value={{
            setCurrentUser: vitest.fn(),
            refreshUsers: () => {},
            currentUser: mockAdmin,
          }}
        >
          <NavigationBar />
        </UserContext.Provider>
      </BrowserRouter>
    );

    const headingElement = screen.getByRole("heading");
    expect(headingElement).toBeInTheDocument();

    const homeLink = screen.getByRole("link", { name: "Home" });
    expect(homeLink).toBeInTheDocument();

    const yourMoviesLink = screen.getByRole("link", { name: "Your movies" });
    expect(yourMoviesLink).toBeInTheDocument();

    const profileLink = screen.getByRole("link", { name: "Profile" });
    expect(profileLink).toBeInTheDocument();

    const addMovieLink = screen.getByRole("link", { name: "Add movie" });
    expect(addMovieLink).toBeInTheDocument();

    const editMovieLink = screen.getByRole("link", { name: "Edit movie" });
    expect(editMovieLink).toBeInTheDocument();

    const logoutLink = screen.getByRole("link", { name: "Logout" });
    expect(logoutLink).toBeInTheDocument();
  });

  test("logout button calls function correctly", async () => {
    render(
      <BrowserRouter>
        <UserContext.Provider
          value={{
            setCurrentUser: vitest.fn(),
            refreshUsers: () => {},
            currentUser: mockUser,
          }}
        >
          <NavigationBar />
        </UserContext.Provider>
      </BrowserRouter>
    );

    const spy = vitest.spyOn(utils, "logoutUser");

    const logoutLink = screen.getByRole("link", { name: "Logout" });

    expect(spy).toHaveBeenCalledTimes(0);

    await user.click(logoutLink);

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
