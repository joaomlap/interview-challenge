import express from "express";
import { items } from "./items";

export const app = express();
const port = process.env.PORT || 8080;

app.use(express.static("dist"));

app.get("/api/items", (req: express.Request, res: express.Response) => {
  const search = req.query.search;
  let result = items.slice();

  if (search && typeof search === "string") {
    const regex = new RegExp(`.*${search.toLowerCase()}.*`);
    result = items.filter((item) => regex.test(item.name.toLowerCase()));
  }

  res.send({ items: result });
});

export const appInstance = app.listen(port, () =>
  console.log(`Listening on port ${port}!`)
);
