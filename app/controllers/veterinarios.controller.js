const Veterinarios = require("../models/veterinarios.model.js");

// Retrieve all Customers from the database.
exports.getAllClinicas = (req, res) => {
    Veterinarios.getAllClinicas((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving customers."
          });
        else res.send(data);
      });
};

