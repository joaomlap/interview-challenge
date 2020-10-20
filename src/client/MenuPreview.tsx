import React from "react";
import { Item } from "../shared/api";

type MenuPreviewProps = {
  selectedItems: Item[];
  removeItem: (index: number) => void;
};

export const MenuPreview = ({
  selectedItems,
  removeItem,
}: MenuPreviewProps) => {
  return (
    <div className="col-8">
      <h2>Menu preview</h2>
      <ul className="menu-preview">
        {selectedItems.map((item, index) => (
          <li className="item">
            <h2>{item.name}</h2>
            <p>
              {item.dietaries.map((dietarie) => (
                <span className="dietary">{dietarie}</span>
              ))}
            </p>
            <button onClick={() => removeItem(index)} className="remove-item">
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
