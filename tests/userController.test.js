const request = require("supertest");
const app = require("../server");
const db = require("../api/models");

// must disable logging in all code (sequelize)

//  args via body is associated with DB  "userId"
//  args via params is associated with user "id"

let sample = {
  mockUser1: {
    id: "U.00000000",
    phone: "9999999999999",
    name: "Sample User 01",
  },
  mockUser2: {
    id: "U.11111111",
    phone: "8888888888888",
    name: "Sample User 02",
  },
};

beforeAll(async () => {
  await db.sequelize.sync();
});

describe("User Controller testing", () => {
  test("Creating a new User", async () => {
    let queryResult = await request(app)
      .post("/api/user")
      .send(sample.mockUser1);
    expect(queryResult.statusCode).toEqual(201);
    expect(queryResult.body).toHaveProperty("userId");
    expect(queryResult.body.userId).toEqual(sample.mockUser1.id);
    queryResult = await request(app).post("/api/user").send(sample.mockUser2);
    expect(queryResult.statusCode).toEqual(201);
    expect(queryResult.body).toHaveProperty("userId");
    expect(queryResult.body.userId).toEqual(sample.mockUser2.id);
  });
  test("List all Users", async () => {
    const queryResult = await request(app).get("/api/user");
    expect(queryResult.statusCode).toEqual(200);
    expect(queryResult.type).toEqual("application/json");
    expect(queryResult.body).toHaveLength(2);
    //console.log(queryResult.body);
  });
  test("Retrieve a User", async () => {
    const queryResult = await request(app).get(
      "/api/user/" + sample.mockUser1.id
    );
    expect(queryResult.statusCode).toEqual(200);
    expect(queryResult.type).toEqual("application/json");
    expect(queryResult.body).toHaveProperty("userId");
    expect(queryResult.body.userId).toEqual(sample.mockUser1.id);
    //console.log(queryResult.body);
  });
  test("Update an User data", async () => {
    const queryResult = await request(app)
      .put("/api/user/" + sample.mockUser1.id)
      .send({ userPhone: "7777777777777" });
    expect(queryResult.statusCode).toEqual(200);
    expect(queryResult.body.message).toContain("successfully"); // change to !error
    //console.log(queryResult.body);
  });
  test("Delete a User", async () => {
    const queryResult = await request(app).delete(
      "/api/user/" + sample.mockUser2.id
    );
    //console.log(queryResult.body);
    expect(queryResult.statusCode).toEqual(200);
    expect(queryResult.body.message).toContain("successfully"); // change to !error
  });
});
