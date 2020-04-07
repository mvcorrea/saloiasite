const db = require("./models");
const Saloia = db.saloia;
const Op = db.Sequelize.Op;


// Create a new user
exports.create = (req, res) => {
  const user = {
    userPhone: req.body.phone,
    userName: req.body.name,
    userAddr: req.body.addr
  };
  Saloia.Users.create(user)
    .then(data => res.send(data))
    .catch(err =>
      res.status(500).send({
        message:
          "error 221: " + (err.message || "Unknown error when creating a User")
      })
    );
};

// List all users
exports.findAll = (req, res) => {
  const phone = req.query.phone;
  var condition = phone ? { phone: { [Op.like]: `%${phone}%` } } : null;

  Saloia.Users.findAll({ where: condition })
    .then(data => res.send(data))
    .catch(err =>
      res.status(500).send({
        message:
          "error 222: " +
          (err.message || "Unknown error while retrieving Users.")
      })
    );
};

// Find a single user with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Saloia.Users.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "error 223: " +
          (err.message || "Unknown error while retrieving User: " + id),
      });
    });
};

// Update a user by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Saloia.Users.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating USer with id=" + id,
      });
    });
};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Saloia.Users.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id,
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  Saloia.Users.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all users.",
      });
    });
};

// find all published User
exports.findAllActive = (req, res) => {
  Tutorial.findAll({ where: { userActive: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};
