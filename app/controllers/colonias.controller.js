const Colonias = require("../models/colonias.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log("valor de req:",req);

  // Create a colonia
  const colonias  = new Colonias({
    idColonia : req.body.idColonia,
    nombreColonia : req.body.nombreColonia,
    controlado : req.body.controlado
  });

  console.log("La colonia definido es:",colonias);
  // Save cat in the database
  Colonias.create(colonias, (err, data) => {
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
    Colonias.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving huchas."
          });
        else res.send(data);
      });
};

exports.getEstadoColonias = (req,res)=>{
  Colonias.getEstadoColonias((err,data)=>{
    if(err)
      res.status(500).send({message:err.message || "Error al obtener los datos de los etados de las colonias."});
    else
      res.send(data);
  });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    Colonias.findById(req.params.idColonia, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not colonia with id ${req.params.idColonia}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving colonia with id " + req.params.idColonia
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

  Colonias.updateById(
    req.params.idColonia,
    new Colonias(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found hucha with id ${req.params.idColonia}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating hucha with id " + req.params.idColonia
          });
        }
      } else res.send(data);
    }
  );

 
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    Colonias.remove(req.params.idColonia, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found colonia with id ${req.params.idColonia}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete colonia with id " + req.params.idColonia
            });
          }
        } else res.send({ message: `colonia was deleted successfully!` });
      });
};


