import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("renders The World of Disney title", () => {
  render(<App />);
  const titleElement = screen.getByText(/The World of Disney/i);
  expect(titleElement).toBeInTheDocument();
});

describe("show-favourite related testcases", () => {
  it("screen should display show-favourite button", () => {
    render(<App />);
    const button = screen.getByRole("button", { name: "Show Favourites" });
    expect(button).toBeInTheDocument();
  });

  it("screen should display show-all button", () => {
    render(<App />);
    const button = screen.getByRole("button", { name: "Show Favourites" });
    fireEvent.click(button);
    const button1 = screen.getByRole("button", { name: "Show All" });
    expect(button1).toBeInTheDocument();
  });

  it("screen should display all add-to-favourite cards", async () => {
    render(<App />);
    const favoritedcards = await screen.findAllByText(/Add to Favourites/i);
    expect(favoritedcards).toHaveLength(50);
  });

  it("screen should display a favourited card", async () => {
    render(<App />);
    const addtofavbuttons = await screen.findAllByText(/Add to Favourites/i);
    fireEvent.click(addtofavbuttons[0]);
    const favbuttons = await screen.findAllByText(/Favourited/i);
    expect(favbuttons[0]).toBeInTheDocument();
  });
});
