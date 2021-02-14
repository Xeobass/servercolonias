const sql = require("./db.js");

// constructor
const Tests = function(test) {
    idTest=req.body.idGato,
    idClinicaVeterinaria = req.body.idColonia,
    idResultadoTest = req.body.idEsterilizacion,
    idGato = req.body.idChip,
    fechaTest = req.body.idSituacion
  console.log("TESTS:",test);
};


Tests.create = (newGato, result) => {
    sql.query("INSERT INTO gatos SET ?", newGato, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created gato: ", { id: res.insertId, ...newGato });
      result(null, { id: res.insertId, ...newGato });
    });
  };

  

  Tests.findById = (volunteerId, result) => {
    sql.query(`SELECT * FROM usuario WHERE id = ${volunteerId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found volunteer: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found volunteer with the id
      result({ kind: "not_found" }, null);
    });
  };

  

  

  Tests.getAll = result => {
    sql.query("SELECT * FROM gatos", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("usuario: ", res);
      result(null, res);
    });
  };

  
  
  Tests.updateById = (id, volunteer, result) => {
    sql.query(
      "UPDATE usuario SET email = ?, name = ?, active = ? WHERE id = ?",
      [volunteer.email, volunteer.name, volunteer.active, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Volunteer with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated volunteer: ", { id: id, ...volunteer });
        result(null, { id: id, ...volunteer });
      }
    );
  };
  
  Tests.remove = (id, result) => {
    sql.query("DELETE FROM usuario WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found volunteer with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted volunteer with id: ", id);
      result(null, res);
    });
  };
  
  Tests.removeAll = result => {
    sql.query("DELETE FROM usuario", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} usuario`);
      result(null, res);
    });
  };
  
  module.exports = Tests;
