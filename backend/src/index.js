const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const os = require("os"); // To get local network IP
const path = require("path"); // ✅ Missing import
const Routers = require("./route");
const db = require("./db");

const app = express();
const PORT = 8000;

// ✅ Get local IP for network access
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

// ✅ Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Use all routes from route/index.js
app.use(Routers);

// ✅ Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running:
  ➤ Local:   http://localhost:${PORT}
  ➤ Network: http://${HOST}:${PORT}`);
});
