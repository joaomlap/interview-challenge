import { findByText, render } from "@testing-library/react";
import React from "react";
import { Dietaries } from "../../shared/api";
import { MenuSummary } from "../MenuSummary";

describe("MenuSummary", () => {
  it("should render correctly with empty values", async () => {
    const { container } = render(<MenuSummary items={[]} />);

    expect(await findByText(container, /0 items/)).toBeTruthy();
  });

  it("should render correctly when passing items", async () => {
    const { container } = render(
      <MenuSummary
        items={[
          {
            id: 1001,
            name:
              "Kale Caesar Pasta, Turmeric Satay Broccoli & Lemon Cashew Greens",
            dietaries: [
              Dietaries.Vegetarian,
              Dietaries.Vegan,
              Dietaries.NutFree,
              Dietaries.DairyFree,
            ],
          },
          {
            id: 1002,
            name: "Hake & Smoky Chickpeas, Brown Rice & Quinoa, Roasted Roots",
            dietaries: [
              Dietaries.GlutenFree,
              Dietaries.DairyFree,
              Dietaries.NutFree,
              Dietaries.Halal,
            ],
          },
          {
            id: 1003,
            name:
              "Dill & Swiss Chard Potato Cakes, Summer Tabbouleh & Roasted Roots",
            dietaries: [Dietaries.GlutenFree, Dietaries.NutFree],
          },
        ]}
      />
    );

    expect(await findByText(container, /3 items/)).toBeTruthy();

    const dietaries = container.querySelectorAll(".dietary");
    expect(dietaries.length).toEqual(6);

    const nutFreeShouldHave3x = await findByText(container, /3x/);
    expect(nutFreeShouldHave3x.innerHTML).toContain("n!");
  });
});
