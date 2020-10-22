import request from "supertest";
import { app, appInstance } from "..";
import { items } from "../items";

describe("Server", () => {
  afterAll(() => appInstance.close());

  it("should respond correctly with all items", (done) => {
    request(app)
      .get("/api/items")
      .then((res) => {
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({ items });
        done();
      });
  });

  it("should respond correctly with filtered items", (done) => {
    request(app)
      .get("/api/items?search=kale")
      .then((res) => {
        expect(res.status).toEqual(200);
        expect(res.body).not.toEqual({ items });
        expect(res.body).toEqual({
          items: [
            {
              id: 1001,
              name:
                "Kale Caesar Pasta, Turmeric Satay Broccoli & Lemon Cashew Greens",
              dietaries: ["v", "ve", "df", "gf", "n!"],
            },
          ],
        });
        done();
      });
  });
});
