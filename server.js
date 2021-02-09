
const port = 9876;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')

const app = express();
app.use(cors());

// parse requests of content-type: application/json
app.use(bodyParser.json({limit: '50mb', extended: true}));

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb',type:'application/x-www-form-urlencoded' }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Bienvenid@ a la aplicación de gestión de la protectora Colonias Canguesas." });
});



require("./app/routes/huchas.routes.js")(app);
require("./app/routes/veterinarios.routes.js")(app);
require("./app/routes/volunteers.routes.js")(app);
require("./app/routes/gatos.routes.js")(app);
require("./app/routes/colonias.routes.js")(app);

app.listen(port,()=>{
    console.log(`Servidor escuchando en puerto ${port}`);
});
