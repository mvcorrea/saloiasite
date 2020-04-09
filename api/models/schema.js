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
        allowNull: false,
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
          inst.userId = "U." + new Date().getTime().toString(36);
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
        unique: true,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dlvId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      orderItems: {
        type: Sequelize.JSON,
        allowNull: true,
        required: false,
      },
      orderBill: {
        type: Sequelize.STRING,
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
    {
      timestamps: false,
      hooks: {
        beforeCreate: (inst, opts) => {
          inst.orderId = "O." + new Date().getTime().toString(36);
        },
      },
    }
  );

  const Products = sequelize.define(
    "products",
    {
      prdId: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
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
    {
      timestamps: false,
      hooks: {
        beforeCreate: (inst, opts) => {
          inst.prdId = "P." + new Date().getTime().toString(36);
        },
      },
    }
  );

  const Delivers = sequelize.define(
    "delivers",
    {
      dlvId: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
      },
      orderId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dlvAgent: {
        type: Sequelize.STRING,
        allowNull: true, 
      },
      dlvStatus: {
        type: Sequelize.ENUM,
        values: ["preparo", "entrega", "finalizado"],
        defaultValue: "preparo",
      },
      dlvTime: {
        type: Sequelize.DATE,
      },
    },
    {
      timestamps: false,
      hooks: {
        beforeCreate: (inst, opts) => {
          inst.dlvId = "D." + new Date().getTime().toString(36);
        },
      },
    }
  );

  return { Users, Orders, Products, Delivers };
};
