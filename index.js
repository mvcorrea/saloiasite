const app = require("./server");
const port = process.env.PORT || 5001;


app.listen(port, () =>
  console.log("app listening on http://localhost:" + port)
);