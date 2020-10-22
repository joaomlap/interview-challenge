import React, { useState } from "react";
import useSWR from "swr";
import useDebounce from "use-debounce/lib/useDebounce";
import { Item, ItemsResponse } from "../shared/api";

type MenuProps = {
  addItem: (item: Item) => void;
};

export const Menu = ({ addItem }: MenuProps) => {
  const [search, setSearch] = useState("");

  const handleSearch = (evt: React.FormEvent<HTMLInputElement>) => {
    setSearch(evt.currentTarget.value);
  };

  return (
    <div className="col-4">
      <div className="filters">
        <input
          onChange={handleSearch}
          className="form-control"
          placeholder="Name"
          value={search}
        />
      </div>
      <MenuList search={search} addItem={addItem} />
    </div>
  );
};

type MenuListProps = {
  search: string;
  addItem: (item: Item) => void;
};

const MenuList = ({ search, addItem }: MenuListProps) => {
  const [debouncedSearch] = useDebounce(search, 400);
  const { data, error } = useSWR<ItemsResponse>(
    debouncedSearch ? `/api/items?search=${debouncedSearch}` : "/api/items"
  );
  let itemsResult = null;

  if (error) {
    return <>An error occurred!</>;
  } else if (!data) {
    return <>Loading...</>;
  } else {
    const { items } = data;

    itemsResult = items.map((item) => (
      <li className="item clickable" onClick={() => addItem(item)}>
        <h2>{item.name}</h2>
        <p>
          {item.dietaries.map((dietarie) => (
            <span className="dietary">{dietarie}</span>
          ))}
        </p>
      </li>
    ));
  }

  return <ul className="item-picker">{itemsResult}</ul>;
};
