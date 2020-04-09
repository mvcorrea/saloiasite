const db = require("../api/models");
const orders = db.saloia.Orders;

let sample = {
  mockOrder1: {
    orderId: "O.22222222",
    userId: "U.00000000",
    dlvId: "D.33333333",
    orderItems: {},
  },
  mockOrder2: {
    orderId: "O.44444444",
    userId: "U.11111111",
    dlvId: "D.33333333",
    orderItems: {},
  },
};

beforeAll(async () => {
  await db.sequelize.sync();
});

describe("Order Model testing", () => {
  test("testing 'create' & 'findByPk'", async () => {
    // creating order 01
    await orders.create(sample.mockOrder1);
    // verifying the order creation
    const queryResult = await orders.findByPk("O.22222222");
    expect(queryResult.orderId).toEqual(sample.mockOrder1.orderId);
  });

  test("testing 'create' & 'findAll'", async () => {
    // creating order 02
    await orders.create(sample.mockOrder2);
    // verifying the order creation / finding all active
    const queryResult = await orders.findAll({ where: { orderStatus: false } });
    expect(queryResult.length).toEqual(Object.keys(sample).length);
  });

  test("testing 'update' & 'findAll'", async () => {
    //  setting the order1 as inactive
    await orders.update(
      { orderStatus: true },
      { where: { orderId: "O.22222222" } }
    );
    //
    const queryResult = await orders.findAll({ where: { orderStatus: true } });
    expect(queryResult.length).toEqual(1);
  });

  test("testing 'destroy' & 'findOne' & 'findAll'", async () => {
    await orders.destroy({ where: { orderId: "O.22222222" } });
    //
    let queryResult = await orders.findAll({ raw: true });
    expect(queryResult.length).toEqual(1);
    queryResult = await orders.findOne({ where: { orderId: "O.22222222" } });
    expect(queryResult).toBeNull();

    //await orders.destroyAll();

    // console.log(queryResult);  // need {raw:true}
  });
});
