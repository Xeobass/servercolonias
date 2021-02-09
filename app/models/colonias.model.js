const sql = require("./db.js");

// constructor
const Colonias = function(colonia) {
    this.idColonia = colonia.idColonia;
    this.nombreColonia = colonia.nombreColonia;
    this.controlado = colonia.controlado;

    console.log("colonias:",colonia)


};


Colonias.create = (newColonia, result) => {
    console.log("New colonia = ",newColonia)
    sql.query("INSERT INTO coloniasIdentificadas SET ?", newColonia, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created colonia: ", { id: res.insertId, ...newColonia });
      result(null, { id: res.insertId, ...newColonia });
    });
  };



  Colonias.findById = (idHucha, result) => {
    sql.query(`SELECT * FROM cuantiaHuchas WHERE idHucha = ${idHucha}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found hucha: ", res);
        result(null, res);
        return;
      }
  
      // not found volunteer with the id
      result({ kind: "not_found" }, null);
    });
  };

  

  Colonias.getAll = result => {
    sql.query("SELECT * FROM huchas ORDER BY `huchas`.`lugarHucha` ASC", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("hucha: ", res);
      result(null, res);
    });
  };


 
  Colonias.updateById = (id, volunteer, result) => {
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
  
  Colonias.remove = (id, result) => {
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
  
  module.exports = Colonias;
