import { render, screen } from "@testing-library/react";
import { NavigationBar } from "./NavigationBar";

jest.mock("../contexts/UserContext.tsx", () => ({}));

describe("Navigation bar", () => {
  test("renders properly", () => {
    render(<NavigationBar />);
  });
});
