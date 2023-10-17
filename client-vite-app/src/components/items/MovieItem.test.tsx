import { render, screen } from "@testing-library/react";
import { MovieItem } from "./MovieItem";
import { MovieType } from "../contexts/MovieContext";
import user from "@testing-library/user-event";
import * as utils from "../utils/moviesFunctions";

const mockMovie: MovieType = {
  id: 12345,
  name: "Mock Name",
  genre: "Mock Genre",
  price: 4.99,
  stock: 99,
};

vitest.mock("../utils/moviesFunctions.tsx");

describe("Movie item", () => {
  test("should render correctly", () => {
    render(<MovieItem movie={mockMovie} />);

    const form = screen.queryByRole("form");
    expect(form).toBeInTheDocument();

    const nameSpan = screen.getByText(mockMovie.name);
    expect(nameSpan).toBeInTheDocument();

    const genreSpan = screen.getByText(mockMovie.genre);
    expect(genreSpan).toBeInTheDocument();

    const priceSpane = screen.getByText(mockMovie.price);
    expect(priceSpane).toBeInTheDocument();

    const stockSpan = screen.getByText(mockMovie.stock);
    expect(stockSpan).toBeInTheDocument();

    const rentButton = screen.queryByRole("button", {
      name: "Rent",
    });
    expect(rentButton).toBeInTheDocument();
  });

  test("rent button works correctly", async () => {
    render(<MovieItem movie={mockMovie} />);

    const spy = vitest.spyOn(utils, "rentMovie");

    const rentButton = screen.queryByRole("button", { name: "Rent" });

    expect(spy).toBeCalledTimes(0);

    await user.click(rentButton!);

    expect(spy).toBeCalledTimes(1);
  });
});
