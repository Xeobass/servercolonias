module.exports = app => {
    const veterinarios = require("../controllers/veterinarios.controller.js");
  
    // Create a new Customer
    app.get("/veterinarios", veterinarios.getAllClinicas);
  

  };