import React from "react";
import useSWR from "swr";
import { ItemsResponse } from "../shared/api";
import "./App.css";

export const App = () => {
  const { data, error } = useSWR<ItemsResponse>("/api/items");

  if (error) {
    return <>An error occurred!</>;
  } else if (!data) {
    return <>Loading...</>;
  }

  const { items } = data;

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

  console.log(dietarieSums);

  return (
    <div className="wrapper">
      <div className="menu-summary">
        <div className="container">
          <div className="row">
            <div className="col-6 menu-summary-left">
              <span>{items.length} items</span>
            </div>
            <div className="col-6 menu-summary-right">
              {Object.keys(dietarieSums).map((key) => (
                <>
                  {dietarieSums[key]}x <span className="dietary">{key}</span>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="container menu-builder">
        <div className="row">
          <div className="col-4">
            <div className="filters">
              <input className="form-control" placeholder="Name" />
            </div>
            <ul className="item-picker">
              {items.map((item) => (
                <li className="item">
                  <h2>{item.name}</h2>
                  <p>
                    {item.dietaries.map((dietarie) => (
                      <span className="dietary">{dietarie}</span>
                    ))}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-8">
            <h2>Menu preview</h2>
            <ul className="menu-preview">
              <li className="item">
                <h2>Dummy item</h2>
                <p>
                  <span className="dietary">ve</span>
                  <span className="dietary">v</span>
                  <span className="dietary">n!</span>
                </p>
                <button className="remove-item">x</button>
              </li>
              <li className="item">
                <h2>Dummy item</h2>
                <p>
                  <span className="dietary">ve</span>
                  <span className="dietary">v</span>
                  <span className="dietary">n!</span>
                </p>
                <button className="remove-item">x</button>
              </li>
              <li className="item">
                <h2>Dummy item</h2>
                <p>
                  <span className="dietary">ve</span>
                  <span className="dietary">v</span>
                  <span className="dietary">n!</span>
                </p>
                <button className="remove-item">x</button>
              </li>
              <li className="item">
                <h2>Dummy item</h2>
                <p>
                  <span className="dietary">ve</span>
                  <span className="dietary">v</span>
                  <span className="dietary">n!</span>
                </p>
                <button className="remove-item">x</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
