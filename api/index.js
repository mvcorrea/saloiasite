const db = require("./models");
const saloia = require("./controller");
const router = require("express").Router();


db.sequelize.sync();
// db.sequelize
//   .sync({ force: true })
//   .then(() => console.log("Drop and re-sync db."));

router.get("/", (req, res) => {
  res.json({ message: "Welcome to Saloia API." });
});

// Create a new User
router.post("/user", saloia.create);
// Retrieve all Users
router.get("/user", saloia.findAll);
// Find one User
router.get("/user/:id", saloia.findOne);
// Update a User with id
router.put("/user/:id", saloia.update);
// Retrieve all active users
router.get("/users/active", saloia.findAllActive);



module.exports = router;
