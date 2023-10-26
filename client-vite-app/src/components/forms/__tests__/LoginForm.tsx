import { render, screen } from "@testing-library/react";
import { LoginForm } from "../LoginForm";
import user from "@testing-library/user-event";
import * as utils from "../../utils/userFunctions";

vitest.mock("../utils/userFunctions.tsx");

describe("Login form", () => {
  beforeEach(() => {
    render(<LoginForm />);
  });

  test("renders correctly", () => {
    const formElement = screen.getByRole("form");
    expect(formElement).toBeInTheDocument();
  });

  test("login button calls function correctly", async () => {
    const spy = vitest.spyOn(utils, "loginUser");

    const loginButton = screen.getByRole("button", { name: "Sign in" });

    expect(spy).toHaveBeenCalledTimes(0);

    await user.click(loginButton);

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
