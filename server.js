const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//const cors = require("cors")
const path = require("path");
const api = require("./api");

// sample: https://github.com/bezkoder/nodejs-express-sequelize-mysql
//         https://github.com/nedssoft/sequelize-with-postgres-tutorial

// react production path
const react_static = path.join(__dirname, "client/build");
app.use(express.static(react_static));

//var corsOptions = { origin: "http://localhost:5001" };
//app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));




// index.js from within the folder api resolves all requests
//app.use("/api", require("./api")(app));
//require("./api")(app)
app.use("/api", api);

// React Content, it only reaches here if does not match any prior line
const indexPage = react_static + "index.html";
app.get("*", (req, res) => {
  res.sendFile(indexPage) || res.sendStatus(404);
});


module.exports = app;


// app.listen(port, () =>
//   console.log("app listening on http://localhost:" + port)
// );
