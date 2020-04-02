const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const port = process.env.PORT || 5001;

// react production path
const react_static = path.join(__dirname, "client/build");
app.use(express.static(react_static));

//// ROUTES
// index.js from within the folder api resolves all requests
app.use("/api", require("./api"));

// React Content, it only reaches here if does not match any prior line
const indexPage = react_static + "index.html";
app.get("*", (req, res) => {
  fs.existsSync(indexPage) ? res.sendFile(indexPage) : res.sendStatus(404);
});

app.listen(port, () =>
  console.log("app listening on http://localhost:" + port)
);
