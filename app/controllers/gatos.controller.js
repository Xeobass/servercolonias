const Gatos = require("../models/gatos.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a cat
  const gatos = new Gatos({
    idGato:req.body.idGato,
    idColonia : req.body.idColonia,
    idEsterilizacion : req.body.idEsterilizacion,
    idChip : req.body.idChip,
    idSituacion : req.body.idSituacion,
    idSexo : req.body.idSexo,
    idPositivo : req.body.idPositivo,
    nombreGato : req.body.nombreGato,
    imagenGato : req.body.imagenGato,
    peso : req.body.peso,
    marcaEsterilizacion : req.body.marcaEsterilizacion,
    caracteristicas : req.body.caracteristicas,
    nacimientoGato : req.body.nacimientoGato,
    fallecimientoGato : req.body.fallecimientoGato
  });

  console.log("El gato definido es:",gatos);
  // Save cat in the database
  Gatos.create(gatos, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the cat."
      });
    else res.send(data);
  });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Gatos.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving customers."
          });
        else res.send(data);
      });
};

exports.getColonias = (req,res)=>{
  Gatos.getColonias((err,data)=>{
    if(err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving colonias."
    });
  else res.send(data);
  })
}

exports.getSexo = (req,res)=>{
  Gatos.getSexo((err,data)=>{
    if(err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving colonias."
    });
  else res.send(data);
  })
}

exports.getPositivo = (req,res)=>{
  Gatos.getPositivo((err,data)=>{
    if(err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving positivo."
    });
  else res.send(data);
  })
}

exports.getSituacion = (req,res)=>{
  Gatos.getSituacion((err,data)=>{
    if(err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving colonias."
    });
  else res.send(data);
  })
}

exports.getLastGato = (req,res)=>{
  Gatos.getLastGato((err,data)=>{
    if(err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving colonias."
    });
  else res.send(data);
  })
}

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    Gatos.findById(req.params.gatoId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Customer with id ${req.params.customerId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Customer with id " + req.params.customerId
            });
          }
        } else res.send(data);
      });
};

exports.credentials = (req, res) =>{
  console.log(`accediendo al sistema con las credenciales: usr -> ${req.query.usrnombre} y pass -> ${req.query.usrpass}`);
  Gatos.credentials(req.query.usrpass,req.query.usrnombre,(err,resp)=>{
    if(err){
      console.log("Error, el usuario no existe");
      res.send(false);
    }else{
      console.log(`Bienvenido/a ${req.query.usrnombre}`);
      res.send(true);
    }
  })
}

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Gatos.updateById(
    req.params.customerId,
    new Gatos(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.customerId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.customerId
          });
        }
      } else res.send(data);
    }
  );

 
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    Gatos.remove(req.params.volunteerId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Customer with id ${req.params.customerId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Customer with id " + req.params.customerId
            });
          }
        } else res.send({ message: `Customer was deleted successfully!` });
      });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    Gatos.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all customers."
          });
        else res.send({ message: `All Customers were deleted successfully!` });
      });
};
