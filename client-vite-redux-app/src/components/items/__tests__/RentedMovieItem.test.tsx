import { render, screen } from "@testing-library/react";
import { RentedMovieItem } from "../RentedMovieItem";
import { RentedMovieType } from "../../contexts/RentedMoviesContext";
import user from "@testing-library/user-event";
import * as utils from "../../utils/rentedMoviesFunctions";

const mockMovie: RentedMovieType = {
  id: 12345,
  name: "Mock Name",
  genre: "Mock Genre",
  time: 12,
  price: 4.99,
  renter: "mock@example.com",
};

vitest.mock("../utils/rentedMoviesFunctions.tsx");

describe("Rented movie item", () => {
  test("renders correctly", () => {
    render(<RentedMovieItem rentedMovie={mockMovie} />);

    const form = screen.queryByRole("form");
    expect(form).toBeInTheDocument();

    const nameSpan = screen.getByText(mockMovie.name);
    expect(nameSpan).toBeInTheDocument();

    const genreSpan = screen.getByText(mockMovie.genre);
    expect(genreSpan).toBeInTheDocument();

    const timeSpan = screen.getByRole("textbox");
    expect(timeSpan).toBeInTheDocument();
    expect(timeSpan).toHaveValue(mockMovie.time.toString());

    const priceSpane = screen.getByText(mockMovie.price);
    expect(priceSpane).toBeInTheDocument();

    const rentButton = screen.queryByRole("button", {
      name: "Remove",
    });
    expect(rentButton).toBeInTheDocument();
  });

  test("time buttons calls functions correctly", async () => {
    render(<RentedMovieItem rentedMovie={mockMovie} />);

    const spy = vitest.spyOn(utils, "changeRentedMovieTime");

    const decrementButton = screen.queryByRole("button", {
      name: "←",
    });
    expect(decrementButton).toBeInTheDocument();

    const incrementButton = screen.queryByRole("button", {
      name: "→",
    });

    expect(spy).toBeCalledTimes(0);

    await user.click(decrementButton!);

    expect(spy).toBeCalledTimes(1);

    await user.click(incrementButton!);

    expect(spy).toBeCalledTimes(2);
  });

  test("remove button works correctly", async () => {
    render(<RentedMovieItem rentedMovie={mockMovie} />);

    const spy = vitest.spyOn(utils, "removeRentedMovie");

    const removeButton = screen.queryByRole("button", {
      name: "Remove",
    });

    expect(spy).toBeCalledTimes(0);

    await user.click(removeButton!);

    expect(spy).toBeCalledTimes(1);
  });
});
