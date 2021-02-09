module.exports = app => {
    const huchas = require("../controllers/huchas.controller.js");
  
    // Create a new Customer
    app.post("/huchas", huchas.create);
    // Create a new Customer
    app.post("/huchas/recaudacion", huchas.insertRecaudacion);
  
    // Retrieve all Customers
    app.get("/huchas", huchas.findAll);
    
    // Retrieve a single Customer with customerId
    app.get("/huchas/:idHucha", huchas.findOne);
  
    // Update a Customer with customerId
    app.put("/huchas/:idHucha", huchas.update);
  
    // Delete a Customer with customerId
    app.delete("/huchas/:huchaId", huchas.delete);
  
    // Create a new Customer
    app.delete("/huchas", huchas.deleteAll);

  };