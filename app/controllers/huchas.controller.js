const Huchas = require("../models/huchas.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a cat
  const huchas = new Huchas({
    idHucha:req.body.idHucha,
    lugarHucha:req.body.lugarHucha,
    fechaInstalacion:req.body.fechaInstalacion,
    fechaRetirada:req.body.fechaRetirada
  });

  console.log("La hucha definido es:",huchas);
  // Save cat in the database
  Huchas.create(huchas, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the hucha."
      });
    else res.send(data);
  });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Huchas.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving huchas."
          });
        else res.send(data);
      });
};


// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    Huchas.findById(req.params.gatoId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not hucha Customer with id ${req.params.huchaId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving hucha with id " + req.params.huchaId
            });
          }
        } else res.send(data);
      });
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Huchas.updateById(
    req.params.customerId,
    new Huchas(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found hucha with id ${req.params.huchaId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating hucha with id " + req.params.huchaId
          });
        }
      } else res.send(data);
    }
  );

 
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    Huchas.remove(req.params.volunteerId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found hucha with id ${req.params.huchaId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete hucha with id " + req.params.huchaId
            });
          }
        } else res.send({ message: `hucha was deleted successfully!` });
      });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    Huchas.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all huchas."
          });
        else res.send({ message: `All huchas were deleted successfully!` });
      });
};
