const db = require("../api/models");
const delivers = db.saloia.Delivers

let sample = {
  mockDeliver1: {
    dlvId: "D.77777777",
    orderId: "O.22222222",
    dlvTime: "",
  },
  mockDeliver2: {
    dlvId: "D.88888888",
    orderId: "O.44444444",
    dlvTime: "",
    dlvStatus: "entrega"
  },
};

beforeAll(async () => {
  await db.sequelize.sync();
});

describe("Deliver Model testing", () => {
  test("testing 'create' & 'findByPk'", async () => {
    // creating deliver 01
    await delivers.create(sample.mockDeliver1);
    // verifying the deliver creation
    const queryResult = await delivers.findByPk("D.77777777");
    expect(queryResult.dlvId).toEqual(sample.mockDeliver1.dlvId);
  });

  test("testing 'create' & 'findAll'", async () => {
    // creating deliver 02
    await delivers.create(sample.mockDeliver2);
    // verifying the deliver creation / finding all active
    const queryResult = await delivers.findAll({
      where: { dlvStatus: "entrega" },
    });
    expect(queryResult.length).toEqual(1);
  });

  test("testing 'update' & 'findAll'", async () => {
    //  setting the deliver1 as inactive
    await delivers.update(
      { dlvStatus: "finalizado" },
      { where: { dlvId: "D.77777777" } }
    );
    //
    const queryResult = await delivers.findAll({
      where: { dlvStatus: "finalizado" },
    });
    expect(queryResult.length).toEqual(1);
  });

  test("testing 'destroy' & 'findOne' & 'findAll'", async () => {
    await delivers.destroy({ where: { dlvId: "D.88888888" } });
    //
    let queryResult = await delivers.findAll({ raw: true });
    expect(queryResult.length).toEqual(1);
    queryResult = await delivers.findOne({
      where: { dlvId: "D.88888888" },
    });
    expect(queryResult).toBeNull();

    //await delivers.destroyAll();

    // console.log(queryResult);  // need {raw:true}
  });
});
