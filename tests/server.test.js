const request = require("supertest");
const app = require("../server");
const db = require("../api/models");

// must disable logging in all code (sequelize)
describe("API testing", () => {
  test("testing the API entrance", async () => {
    const res = await request(app).get("/api");
    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual("application/json");
    expect(res.body).toMatchObject({ message: "Welcome to Saloia API." });
  });
});
