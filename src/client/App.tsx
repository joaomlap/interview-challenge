import React, { useState } from "react";
import { Item } from "../shared/api";
import { Menu } from "./Menu";
import { MenuPreview } from "./MenuPreview";
import { MenuSummary } from "./MenuSummary";
import "./App.css";

export const App = () => {
  const [menu, setMenu] = useState<Item[]>([]);

  const addItem = (item: Item) => {
    const newMenu = menu.slice();
    newMenu.push(item);

    setMenu(newMenu);
  };

  const removeItem = (index: number) => {
    const newMenu = menu.slice();
    newMenu.splice(index, 1);

    setMenu(newMenu);
  };

  return (
    <div className="wrapper">
      <MenuSummary items={menu} />
      <div className="container menu-builder">
        <div className="row">
          <Menu addItem={addItem} />
          <MenuPreview selectedItems={menu} removeItem={removeItem} />
        </div>
      </div>
    </div>
  );
};
