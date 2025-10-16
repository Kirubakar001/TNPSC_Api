const express = require("express");
const multer = require("multer");
const path = require("path");
const adminSubjectController = require("../controller/admin_unit_controller");

const router = express.Router();

// Multer setup

// File upload setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

// Routes
router.post("/insert", upload.single("img"), adminSubjectController.insertUnit);
router.get("/list", adminSubjectController.getAllUnits);
router.post("/update", upload.single("img"), adminSubjectController.updateUnit);
router.post("/delete", adminSubjectController.deleteUnit);

module.exports = router;
