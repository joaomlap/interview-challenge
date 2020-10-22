import "@testing-library/jest-dom";
import { cache } from "swr";

afterEach(() => {
  cache.clear();
});
