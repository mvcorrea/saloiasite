const moment = require("moment");
const db = require("../models");
const Saloia = db.saloia;
const Op = db.Sequelize.Op;

// Create a new user
exports.create = (req, res, next) => {
  const user = {
    userPhone: req.body.phone,
    userName: req.body.name,
    userAddr: req.body.addr,
    userActive: req.body.active,
    userLstMsg: req.body.last,
  };
  Saloia.Users.create(user)
    .then((data) => res.status(201).send(data))
    .catch((err) => {
      err.status = 500;
      next(err);
    });
};

// List any/all users
exports.findAll = (req, res, next) => {

  const { phone, active, last } = req.query;
  let options = { where: {} };

  phone ? (options.where.userPhone = { [Op.like]: `%${phone}%` }) : null; // string
  active ? (options.where.userActive = tmp = active === "true") : null; // boolean
  last ? (options.where.userLstMsg = {[Op.gt]: moment().subtract(last, 'hours').toDate()}) : null; 

  console.log("phone:" + phone +" active:"+ active + " last:"+ last)
  console.log(options);

  Saloia.Users.findAll(options)
    .then((data) => res.send(data))
    .catch((err) => {
      err.status = 500;
      next(err);
    });
};

// Find a single user with an id
exports.findOne = (req, res, next) => {
  const userId = req.params.id;

  Saloia.Users.findByPk(userId)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      err.status = 500;
      next(err);
    });
};

// Update a user by the id in the request
exports.update = (req, res, next) => {
  const id = req.params.id;

  Saloia.Users.update(req.body, {
    where: { userId: id },
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
      err.status = 500;
      next(err);
    });
};

// Delete a user with the specified id in the request
exports.delete = (req, res, next) => {
  const id = req.params.id;

  Saloia.Users.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      }
    })
    .catch((err) => {
      err.status = 500;
      next(err);
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res, next) => {
  Saloia.Users.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch((err) => {
      err.status = 500;
      next(err);
    });
};

// find all published User
exports.findAllActive = (req, res, next) => {
  Tutorial.findAll({ where: { userActive: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      err.status = 500;
      next(err);
    });
};
