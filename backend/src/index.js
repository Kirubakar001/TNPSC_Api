const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const os = require("os"); // to get local network IP
const db = require("./db");
const Routers = require("./route");

const app = express();
const PORT = 8000;

function getLocalIPAddress() {
  const interfaces = os.networkInterfaces();
  for (const name in interfaces) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
}

const HOST = getLocalIPAddress();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(Routers);


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running:
  ➤ Local:   http://localhost:${PORT}
  ➤ Network: http://${HOST}:${PORT}`);
});