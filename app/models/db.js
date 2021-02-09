const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

// open the MySQL connection
connection.connect();

connection.on("connect",()=>{
    console.log("Conectado a la BBDD correctamente");
});

connection.on("error",(err)=>{
  console.error("Error en la conexión de la BBDD:",err);
});

connection.on("close",()=>{
  console.log("Conexión cerrada...reabriendo");
  connection.connect();
});
  
  module.exports = connection;