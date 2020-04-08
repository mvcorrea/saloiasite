const request = require("supertest");
const app = require("../server");
const db = require("../api/models");

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

  test("mocking a new user", async () => {
    const mockUser = {
      userId: "U.00000000",
      userPhone: "9999999999999",
      userName: "Sample User",
    };
    const users = db.saloia.Users;
    // creating a user
    await users.create(mockUser);
    // verifying th user creation
    const insertedUser = await users.findOne({ userId: "U.00000000" });
    expect(mockUser.userPhone).toEqual(insertedUser.userPhone);
  
    // updating a user
    mockUser.userPhone = "8888888888888";
    await users.update(mockUser, { where: { userId: "U.00000000" } });
    // verifying the updated user
    const editedUser = await users.findOne({ userId: "U.00000000" });
    expect(mockUser.userPhone).toEqual(editedUser.userPhone);

    // deleting a user
    await users.destroy({ where: { userId: "U.00000000" } });
    // verifying the deleted
    const deletedUser = await users.findOne({ userId: "U.00000000" }); 
    expect(deletedUser).toBeNull();
    
    //expect(insertedUser).toEqual(mockUser);
    // claro que nao pode, apos inserção são adicionados novos dados!!!!!!!!!!!!!!
  });

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
