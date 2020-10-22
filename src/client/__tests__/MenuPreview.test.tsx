import {
  findAllByText,
  findByText,
  fireEvent,
  getAllByText,
  getByText,
  render,
} from "@testing-library/react";
import React from "react";
import { Dietaries } from "../../shared/api";
import { MenuPreview } from "../MenuPreview";

describe("MenuPreview", () => {
  it("should render correctly when no items are passed", async () => {
    const { container } = render(
      <MenuPreview selectedItems={[]} removeItem={() => {}} />
    );

    await findAllByText(container, /Menu preview/);
    expect(container.querySelector("li")).toEqual(null);
  });

  it("should render correctly when items are passed", async () => {
    const { container } = render(
      <MenuPreview
        selectedItems={[
          {
            id: 1001,
            name:
              "Kale Caesar Pasta, Turmeric Satay Broccoli & Lemon Cashew Greens",
            dietaries: [Dietaries.DairyFree],
          },
          {
            id: 1002,
            name: "Hake & Smoky Chickpeas, Brown Rice & Quinoa, Roasted Roots",
            dietaries: [Dietaries.RefinedSugarFree],
          },
        ]}
        removeItem={() => {}}
      />
    );

    await findAllByText(container, /Menu preview/);

    const items = container.querySelectorAll("li");

    expect(items.length).toEqual(2);
    expect(await findByText(items[0], /Kale/)).toBeTruthy();
    expect(await findByText(items[0], /df/)).toBeTruthy();
    expect(await findByText(items[1], /Hake/)).toBeTruthy();
    expect(await findByText(items[1], /rsf/)).toBeTruthy();
  });

  it("should call removeItem correctly", () => {
    const mockFn = jest.fn();
    const { container } = render(
      <MenuPreview
        selectedItems={[
          {
            id: 1001,
            name:
              "Kale Caesar Pasta, Turmeric Satay Broccoli & Lemon Cashew Greens",
            dietaries: [Dietaries.DairyFree],
          },
          {
            id: 1002,
            name: "Hake & Smoky Chickpeas, Brown Rice & Quinoa, Roasted Roots",
            dietaries: [Dietaries.RefinedSugarFree],
          },
        ]}
        removeItem={mockFn}
      />
    );

    const removeButtons = container.querySelectorAll("button");
    expect(removeButtons.length).toEqual(2);

    removeButtons[0] && fireEvent.click(removeButtons[0]);

    expect(mockFn).toHaveBeenCalledWith(0);
  });
});
