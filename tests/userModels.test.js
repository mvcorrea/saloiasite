const db = require("../api/models");
const users = db.saloia.Users;

let sample = {
  mockUser1: {
    userId: "U.00000000",
    userPhone: "9999999999999",
    userName: "Sample User 01",
  },
  mockUser2: {
    userId: "U.11111111",
    userPhone: "8888888888888",
    userName: "Sample User 02",
  },
};

beforeAll(async () => {
  await db.sequelize.sync();
});

describe("User Model testing", () => {
  test("testing 'create' & 'findByPk'", async () => {
    // creating user 01
    await users.create(sample.mockUser1);
    // verifying the user creation
    const queryResult = await users.findByPk("U.00000000");
    expect(queryResult.userPhone).toEqual(sample.mockUser1.userPhone);
  });

  test("testing 'create' & 'findAll'", async () => {
    // creating user 02
    await users.create(sample.mockUser2);
    // verifying the user creation / finding all active
    const queryResult = await users.findAll({ where: { userActive: true } });
    expect(queryResult.length).toEqual(Object.keys(sample).length);
  });

  test("testing 'update' & 'findAll'", async () => {
    //  setting the user1 as inactive

    await users.update(
      { userActive: false },
      { where: { userId: "U.00000000" } }
    );
    //
    const queryResult = await users.findAll({ where: { userActive: false } });
    expect(queryResult.length).toEqual(1);
  });

  test("testing 'destroy' & 'findOne' & 'findAll'", async () => {
    await users.destroy({ where: { userId: "U.00000000" } });
    //
    let queryResult = await users.findAll({ raw: true });
    expect(queryResult.length).toEqual(1);
    queryResult = await users.findOne({ where: { userId: "U.00000000" } });
      expect(queryResult).toBeNull();
      
      //await users.destroyAll();

    // console.log(queryResult);  // need {raw:true}
  });
});
