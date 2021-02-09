const Huchas = require("../models/huchas.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log("valor de req:",req);

  // Create a hucha
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
  console.log("llamando a findAll");
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
    Huchas.findById(req.params.idHucha, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not hucha hucha with id ${req.params.idHucha}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving hucha with id " + req.params.idHucha
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

exports.insertRecaudacion = (req,res)=>{
  console.log("valor de req insert:",req);
  Huchas.insertRecaudacion(req.body.idHucha,req.body.fechaRecogida,req.body.cuantia,(err,data)=>{
    if(err){
      console.log("Error insertando nueva cantidad a la hucha");
    }

    res.send(data);
  });
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
