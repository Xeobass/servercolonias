const sql = require("./db.js");

// constructor
const Tests = function(test) {
  this.idGato = gato.idGato;
  this.idColonia = gato.idColonia;
  this.idEsterilizacion = gato.idEsterilizacion;
  this.idChip = gato.idChip;
  this.idSituacion = gato.idSituacion;
  this.idSexo = gato.idSexo;
  this.idPositivo = gato.idPositivo;
  this.nombreGato = gato.nombreGato;
  this.imagenGato = gato.imagenGato;
  this.peso = gato.peso;
  this.marcaEsterilizacion = gato.marcaEsterilizacion;
  this.caracteristicas = gato.caracteristicas;
  this.nacimientoGato = gato.nacimientoGato;
  this.fallecimientoGato = gato.fallecimientoGato;
  console.log("TESTS:",test);
};


Gatos.create = (newGato, result) => {
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

  

  Gatos.findById = (volunteerId, result) => {
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

  

  Gatos.credentials = (volunteerPass,volunteerName,result)=>{
    sql.query(`SELECT * FROM usuario WHERE usrnombre =\'${volunteerName}\' AND usrpass=\'${volunteerPass}\';`,(err,res)=>{
      if(err){
        console.log("Error solicitando datos de login:",err);
        result(err,null);
        return;
      }

      if(res.length){
        result(null,res[0]);
        return;
      }

      result({kind:"not_found"},null);
    })
  }

  Gatos.getColonias = result =>{
    sql.query("SELECT * FROM `coloniasIdentificadas` ORDER BY `coloniasIdentificadas`.`nombreColonia` ASC",(err,res)=>{
      if(err){
        console.log("error: ",err);
        result(null,err);
        return;
      }

      result(null,res);
    })
  }

  Gatos.getAll = result => {
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

  Gatos.getSexo = result => {
    sql.query("SELECT * FROM sexoGato", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("sexo de gatos: ", res);
      result(null, res);
    });
  };

  Gatos.getSituacion = result => {
    sql.query("SELECT * FROM situacionGato", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("sexo de gatos: ", res);
      result(null, res);
    });
  };

  Gatos.getPositivo = result => {
    sql.query("SELECT * FROM positivo", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("positivos: ", res);
      result(null, res);
    });
  };

  Gatos.getLastGato = result => {
    sql.query("SELECT idGato,nombreGato FROM gatos ORDER BY idGato DESC LIMIT 1", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("datos último gato: ", res);
      result(null, res);
    });
  };
  
  Gatos.updateById = (id, volunteer, result) => {
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
  
  Gatos.remove = (id, result) => {
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
  
  Gatos.removeAll = result => {
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
  
  module.exports = Gatos;
