import fetch from "jest-fetch-mock";
import { act, findByText, render, waitFor } from "@testing-library/react";
import React from "react";
import { Menu } from "../Menu";

fetch.enableMocks();

describe("Menu", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("should render correctly when api sends empty array", () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        items: [],
      })
    );
    const { container } = render(<Menu addItem={() => {}} />);

    waitFor(() => expect(container.querySelectorAll("li").length).toEqual(0));
  });

  it("should render correctly when api sends a populated array", () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        items: [
          {
            id: 1001,
            name:
              "Kale Caesar Pasta, Turmeric Satay Broccoli & Lemon Cashew Greens",
            dietaries: ["v", "ve", "df", "gf", "n!"],
          },
          {
            id: 1002,
            name: "Hake & Smoky Chickpeas, Brown Rice & Quinoa, Roasted Roots",
            dietaries: ["gf", "df", "rsf"],
          },
        ],
      })
    );
    const { container } = render(<Menu addItem={() => {}} />);

    waitFor(() => {
      expect(container.querySelectorAll("li").length).toEqual(2);
    });
  });

  it("should render an error message when api errors", () => {
    fetch.mockReject();
    const { container } = render(<Menu addItem={() => {}} />);

    waitFor(() => async () => {
      expect(container.querySelectorAll("li").length).toEqual(0);
      expect(await findByText(container, /An error occurred!/)).toBeTruthy();
    });
  });
});
