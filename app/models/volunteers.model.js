const sql = require("./db.js");

// constructor
const Volunteer = function(volunteer) {
  this.email = volunteer.email;
  this.name = volunteer.name;
  this.pass = volunteer.pass;
};


Volunteer.create = (newUser, result) => {
    sql.query("INSERT INTO usuario SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created user: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
  };

  Volunteer.findById = (volunteerId, result) => {
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

  Volunteer.credentials = (volunteerPass,volunteerName,result)=>{
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

  Volunteer.getAll = result => {
    sql.query("SELECT * FROM usuario", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("usuario: ", res);
      result(null, res);
    });
  };
  
  Volunteer.updateById = (id, volunteer, result) => {
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
  
  Volunteer.remove = (id, result) => {
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
  
  Volunteer.removeAll = result => {
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
  
  module.exports = Volunteer;
