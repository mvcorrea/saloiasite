const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 5001;

// react production path
const react_static = path.join(__dirname, "client/build"); 
app.use(express.static(react_static));

//// ROUTES
// index.js from within the folder api resolves all requests
app.use('/api', require("./api"));

// React Content, it only reaches here if does not match any prior line
app.get("*", (req, res) => res.sendFile(react_static + "/index.html"));

app.listen(port, () => console.log("app working on http://localhost:" + port));
