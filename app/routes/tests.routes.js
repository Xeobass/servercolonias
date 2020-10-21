module.exports = app => {
    const tests = require("../controllers/tests.controller.js");
  
    // Create a new Customer
    app.post("/tests", tests.create);
  
    // Retrieve all Customers
    app.get("/tests", tests.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/tests/:gatoId", tests.findOne);
  
    // Update a Customer with customerId
    app.put("/tests/:gatoId", tests.update);
  
    // Delete a Customer with customerId
    app.delete("/tests/:gatoId", tests.delete);
  
    // Create a new Customer
    app.delete("/tests", tests.deleteAll);

  };