const db = require("../api/models");
const products = db.saloia.Products;

let sample = {
  mockProduct1: {
    prdId: "P.55555555",
    prdName: "",
    prdPrice: "",
    prdOpts: "",
  },
  mockProduct2: {
    prdId: "P.66666666",
    prdName: "",
    prdPrice: "",
    prdOpts: "",
  },
};

beforeAll(async () => {
  await db.sequelize.sync();
});

describe("Product Model testing", () => {
  test("testing 'create' & 'findByPk'", async () => {
    // creating product 01
    await products.create(sample.mockProduct1);
    // verifying the product creation
    const queryResult = await products.findByPk("P.55555555");
    expect(queryResult.prdId).toEqual(sample.mockProduct1.prdId);
  });

  test("testing 'create' & 'findAll'", async () => {
    // creating product 02
    await products.create(sample.mockProduct2);
    // verifying the product creation / finding all active
    const queryResult = await products.findAll({
      where: { prdAvail: true },
    });
    expect(queryResult.length).toEqual(Object.keys(sample).length);
  });

  test("testing 'update' & 'findAll'", async () => {
    //  setting the product1 as inactive
    await products.update(
      { prdAvail: false },
      { where: { prdId: "P.55555555" } }
    );
    //
    const queryResult = await products.findAll({
      where: { prdAvail: false},
    });
    expect(queryResult.length).toEqual(1);
  });

  test("testing 'destroy' & 'findOne' & 'findAll'", async () => {
    await products.destroy({ where: { prdId: "P.55555555" } });
    //
    let queryResult = await products.findAll({ raw: true });
    expect(queryResult.length).toEqual(1);
    queryResult = await products.findOne({
      where: { prdId: "P.55555555" },
    });
    expect(queryResult).toBeNull();

    //await products.destroyAll();

    // console.log(queryResult);  // need {raw:true}
  });
});
