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
router.post("/user", saloia.user.createUser);
// Retrieve all Users
router.get("/user", saloia.user.findAllUsers);
// Find one User
router.get("/user/:id", saloia.user.findUser);
// Update a User with id
router.put("/user/:id", saloia.user.updateUser);
// Delete a User
router.delete("/user/:id", saloia.user.deleteUser);
// Delete all Users
router.delete("/user", saloia.user.deleteAllUsers)
// Retrieve all active users
router.get("/users/active", saloia.user.findAllActiveUsers);


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
