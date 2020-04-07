module.exports = (sequelize, Sequelize) => {
  const datetime = () => {
    return new Date().getTime().toString(36);
  };

  const Users = sequelize.define(
    "users",
    {
      userId: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
      },
      userPhone: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
        unique: true,
      },
      userName: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
      },
      userAddr: {
        type: Sequelize.JSON,
        allowNull: true,
        required: false,
      },
      userActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        required: true,
      },
      userLstMsg: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      hooks: {
        beforeCreate: (inst, opts) => {
          //let i = 1;
          inst.userId = "U." + new Date().getTime().toString(36);
          //inst.userId = (i++).toString();
        },
      },
    }
  );

  //Users.hook('beforeCreate')

  const Orders = sequelize.define(
    "orders",
    {
      orderId: {
        type: Sequelize.STRING,
        primaryKey: true,
        defaultValue: "O." + datetime,
        allowNull: false,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dlvId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      orderItems: {
        type: Sequelize.JSON,
        allowNull: true,
        required: false,
      },
      orderTime: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      orderStatus: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        required: true,
      },
    },
    { timestamps: false }
  );

  const Products = sequelize.define(
    "products",
    {
      prdId: {
        _comment: "product id",
        type: Sequelize.STRING,
        primaryKey: true,
        defaultValue: "P." + datetime,
        allowNull: false,
      },
      prdName: {
        _comment: "product name",
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
      },
      prdPrice: {
        _comment: "product price",
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
      },
      prdOpts: {
        _comment: "product options",
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
      },
      prdAvail: {
        _comment: "product availability",
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        required: true,
      },
    },
    { timestamps: false }
  );

  const Delivers = sequelize.define(
    "delivers",
    {
      dlvId: {
        type: Sequelize.STRING,
        primaryKey: true,
        defaultValue: "D." + datetime,
        allowNull: false,
      },
      orderId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dlvStatus: {
        type: Sequelize.ENUM,
        values: ["preparo", "entrega", "finalizado"],
      },
      dlvTime: {
        type: Sequelize.DATE,
      },
    },
    { timestamps: false }
  );

  return { Users, Orders, Products, Delivers };
};
