module.exports = app => {
    const colonias = require("../controllers/colonias.controller.js");
  
    // Create a new Customer
    app.post("/nuevacolonia", colonias.create);
  
    // Retrieve all Customers
    app.get("/estadosColonias", colonias.getEstadoColonias);
    //app.get("/colonias", colonias.getColonias);
    
    // Retrieve a single Customer with customerId
    //app.get("/colonias/:gatoId", colonias.findOne);
  
    // Update a Customer with customerId
    //app.put("/colonias/:gatoId", colonias.update);
  
    // Delete a Customer with customerId
    //app.delete("/colonias/:gatoId", colonias.delete);
  
    // Create a new Customer
    //app.delete("/delcolonias", colonias.deleteAll);

  };