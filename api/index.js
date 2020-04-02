const api = require("express").Router();
const time = require("./time");

api.get("/docs", (req, res) => {
  res.json({
    apiName: "sample API",
    apiVersion: "1.0.0",
    apiPath: "http://localhost:5001/api",
    apiOutput: "application/json",
    apiEndpoits: [
      {
        path: "/about",
        operations: [{ method: "GET", summary: "", notes: "", parameters: [] }]
      },
      {
        path: "/time",
        operations: [{ method: "GET", summary: "", notes: "", parameters: [] }]
      }
    ]
  });
});

api.get("/time", time.gettime);

module.exports = api;
