const sql = require("./db.js");

// constructor
const Huchas = function(hucha) {
    this.idHucha = hucha.idHucha,
    this.lugarHucha = hucha.lugarHucha,
    this.fechaInstalacion = hucha.fechaInstalacion,
    this.fechaRetirada = hucha.fechaRetirada
};


Huchas.create = (newHucha, result) => {
    console.log("New hucha = ",newHucha)
    sql.query("INSERT INTO huchas SET ?", newHucha, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created hucha: ", { id: res.insertId, ...newHucha });
      result(null, { id: res.insertId, ...newHucha });
    });
  };

  

  Huchas.findById = (volunteerId, result) => {
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

  

  Huchas.getAll = result => {
    sql.query("SELECT * FROM huchas", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("hucha: ", res);
      result(null, res);
    });
  };



  Huchas.updateById = (id, volunteer, result) => {
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
  
  Huchas.remove = (id, result) => {
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
  
  Huchas.removeAll = result => {
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
  
  module.exports = Huchas;
