
const port = 9876;
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});



require("./app/routes/volunteers.routes.js")(app);

app.listen(port,()=>{
    console.log(`Servidor escuchando en puerto ${port}`);
});
