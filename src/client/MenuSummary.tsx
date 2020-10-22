import React from "react";
import { Item } from "../shared/api";

type MenuSummaryProps = {
  items: Item[];
};

export const MenuSummary = ({ items }: MenuSummaryProps) => {
  const dietarieSums = items.reduce((acc: Record<string, number>, curr) => {
    curr.dietaries.forEach((d) => {
      if (!acc[d]) {
        acc[d] = 1;
      } else {
        acc[d] += 1;
      }
    });

    return acc;
  }, {});

  return (
    <div className="menu-summary">
      <div className="container">
        <div className="row">
          <div className="col-6 menu-summary-left">
            <span>{items.length} items</span>
          </div>
          <div className="col-6 menu-summary-right">
            {Object.keys(dietarieSums).map((key) => (
              <span key={key}>
                {dietarieSums[key]}x <span className="dietary">{key}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
