import * as express from "express";
import { items } from "./items";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static("dist"));

app.get("/api/items", (_: express.Request, res: express.Response) =>
  res.send({ items })
);

app.listen(port, () => console.log(`Listening on port ${port}!`));
