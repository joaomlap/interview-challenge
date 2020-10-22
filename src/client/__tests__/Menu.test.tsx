import fetch from "jest-fetch-mock";
import { findByText, fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { Menu } from "../Menu";
import { cleanup } from "@testing-library/react-hooks";
import { cache, SWRConfig } from "swr";

fetch.enableMocks();

describe("Menu", () => {
  beforeEach(() => {
    cleanup();
    fetch.resetMocks();
    cache.clear();
  });

  it("should render correctly when api sends empty array", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        items: [],
      })
    );
    const { container } = render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <Menu addItem={() => {}} />
      </SWRConfig>
    );

    await waitFor(() =>
      expect(container.querySelectorAll("li").length).toEqual(0)
    );
  });

  it("should render correctly when api sends a populated array", async () => {
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
    const { container } = render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <Menu addItem={() => {}} />
      </SWRConfig>
    );

    await waitFor(() => {
      expect(container.querySelectorAll("li").length).toEqual(2);
    });
  });

  it("should render an error message when api errors", () => {
    fetch.mockReject();
    const { container } = render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <Menu addItem={() => {}} />
      </SWRConfig>
    );

    waitFor(() => async () => {
      expect(container.querySelectorAll("li").length).toEqual(0);
      expect(await findByText(container, /An error occurred!/)).toBeTruthy();
    });
  });

  it("should call addItem correctly", () => {
    const mockFn = jest.fn();
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
    const { container } = render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <Menu addItem={mockFn} />
      </SWRConfig>
    );

    waitFor(() => {
      const items = container.querySelectorAll("li");
      expect(items.length).toEqual(2);

      items[0] && fireEvent.click(items[0]);

      expect(mockFn).toHaveBeenCalledWith(items[0]);
    });
  });
});
