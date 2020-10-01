const sql = require("./db.js");

// constructor
const Veterinarios = function(veterinario) {
  this.idClinica = veterinario.idClinica;
  this.nombreClinica = veterinario.nombreClinica;
  this.direccion = veterinario.direccion;
  this.telefono = veterinario.telefono;
};


  
Veterinarios.getAllClinicas = result => {
    sql.query("SELECT * FROM clinicasVeterinarias", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("clinica veterinarias: ", res);
      result(null, res);
    });
  };

  
  module.exports = Veterinarios;
