const request = require("supertest");
const app = require("./server");
//const db = require("./api/controller");

// must disable logging in all code (sequelize)

// before(async () => {
//     await db.sequelize.sync();
// });

describe("API testing", () => {
  test("testing the API entrance", async () => {
    const res = await request(app).get("/api");
    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual("application/json");
    expect(res.body).toEqual({ message: "Welcome to Saloia API." });
  });

//   test("mocking a new user", async () => {
//     const mockUser = {
//       userId: "U.00000000",
//       userPhone: "9999999999999",
//       userName: "Sample User",
//     };
//       //const users = db.create.insertOne;
//       await db.create.insertOne(mockUser);
      
//   });

  test("Creating a new User", async () => {
    const res = await request(app).post("/api/user").send({
      phone: "5585998009129",
      name: "Marcelo Correa",
    });
    console.log("> " + res.body.userId);
    console.log("> " + res.body.userName);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("userId");
  });

  test("Creating a new User", async () => {
    const res = await request(app).post("/api/user").send({
      phone: "5585981816046",
      name: "Carla Soledade",
    });
    console.log("> " + res.body.userId);
    console.log("> " + res.body.userName);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("userId");
  });

  test("List all users", async () => {
    const res = await request(app).get("/api/user");
    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual("application/json");
    expect(res.body).toHaveLength(2);
  });

  //test("Get user by their Phone", async () => {});
});
