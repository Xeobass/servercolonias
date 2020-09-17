module.exports = app => {
    const customers = require("../controllers/volunteers.controller.js");
  
    // Create a new Customer
    app.post("/volunteers", customers.create);
  
    // Retrieve all Customers
    app.get("/volunteers", customers.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/volunteers/:customerId", customers.findOne);
  
    // Update a Customer with customerId
    app.put("/volunteers/:customerId", customers.update);
  
    // Delete a Customer with customerId
    app.delete("/volunteers/:customerId", customers.delete);
  
    // Create a new Customer
    app.delete("/volunteers", customers.deleteAll);

    app.get("/login",customers.credentials);
  };