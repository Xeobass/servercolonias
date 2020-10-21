module.exports = app => {
    const gatos = require("../controllers/gatos.controller.js");
  
    // Create a new Customer
    app.post("/gatos", gatos.create);
  
    // Retrieve all Customers
    app.get("/gatos", gatos.findAll);
    
    app.get("/colonias", gatos.getColonias);
    app.get("/sexogatos", gatos.getSexo);
    app.get("/situacion", gatos.getSituacion);
    app.get("/ultimogato", gatos.getLastGato);
    app.get("/positivo", gatos.getPositivo);
  
    // Retrieve a single Customer with customerId
    app.get("/gatos/:gatoId", gatos.findOne);
  
    // Update a Customer with customerId
    app.put("/gatos/:gatoId", gatos.update);
  
    // Delete a Customer with customerId
    app.delete("/gatos/:gatoId", gatos.delete);
  
    // Create a new Customer
    app.delete("/gatos", gatos.deleteAll);

  };