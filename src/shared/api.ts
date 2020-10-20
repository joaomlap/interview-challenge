export type ItemsResponse = {
  items: Item[];
};

export type Item = {
  id: number;
  name: string;
  dietaries: Dietaries[];
};

export enum Dietaries {
  Vegetarian = "v",
  Vegan = "ve",
  DairyFree = "df",
  GlutenFree = "gf",
  NutFree = "n!",
  Halal = "h",
  RefinedSugarFree = "rsf",
}
