import fetch from "jest-fetch-mock";
import React from "react";
import { render, waitFor } from "@testing-library/react";
import { App } from "../App";
import { cache, SWRConfig } from "swr";

fetch.enableMocks();

// Example test
describe("App tests", () => {
  beforeEach(() => cache.clear());

  it("inital state is correct", async () => {
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
        <App />
      </SWRConfig>
    );

    await waitFor(() => {
      const menuItems = container.querySelectorAll(".clickable");
      const menuPreviewItems = container.querySelectorAll(
        ".menu-preview > .item"
      );

      expect(menuItems.length).toEqual(2);
      expect(menuPreviewItems.length).toEqual(0);
    });
  });
});
