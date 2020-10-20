export declare type ItemsResponse = {
    items: Item[];
};
export declare type Item = {
    id: number;
    name: string;
    dietaries: Dietaries[];
};
export declare enum Dietaries {
    Vegetarian = "v",
    Vegan = "ve",
    DairyFree = "df",
    GlutenFree = "gf",
    NutFree = "n!",
    Halal = "h",
    RefinedSugarFree = "rsf"
}
