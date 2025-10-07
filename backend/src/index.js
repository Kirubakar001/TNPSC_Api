const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");
const Routers = require("./route");

const app = express();
const PORT = 8000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.static("public"));

app.use(Routers);

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
