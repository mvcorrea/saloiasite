const Sequelize = require("sequelize");
//const sequelize = new Sequelize("sqlite::memory:", { logging: console.log });
const sequelize = new Sequelize("sqlite::memory:", {
  logging: false,
  raw: true,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.saloia = require("./schema.js")(sequelize, Sequelize);

module.exports = db;
