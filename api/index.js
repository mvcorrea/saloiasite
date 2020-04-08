const db = require("./models");
const saloia = require("./controllers");
const router = require("express").Router();
const docs = require("./apiDocs.json");

db.sequelize.sync();
// db.sequelize
//   .sync({ force: true })
//   .then(() => console.log("Drop and re-sync db (for testing)."));

// Entrypoint show the documentation
router.get("/", (req, res) => res.json(docs));

// Create a new User
router.post("/user", saloia.user.create);
// Retrieve all Users
router.get("/user", saloia.user.findAll);
// Find one User
router.get("/user/:id", saloia.user.findOne);
// Update a User with id
router.put("/user/:id", saloia.user.update);
// Delete a User
router.delete("/user/:id", saloia.user.delete);
// Delete all Users
router.delete("/user", saloia.user.deleteAll)
// Retrieve all active users
router.get("/users/active", saloia.user.findAllActive);


// Error: catch all
router.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 404).json({
    error:
      err.name + " > " + err.message ||
      "Route not found or missing resource.....",
  });
});

module.exports = router;
