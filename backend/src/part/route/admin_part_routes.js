const express = require("express");
const multer = require("multer");
const path = require("path");
const adminSubjectController = require("../controller/admin_part_controller");

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, path.join(__dirname, "../../uploads")),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// 📥 Insert
router.post(
  "/insertPart",
  upload.single("img"),
  adminSubjectController.insertPart
);

// ✏️ Update
router.post(
  "/updatePart",
  upload.single("img"),
  adminSubjectController.updatePart
);

// 🗑️ Delete
router.post("/deletePart", adminSubjectController.deletePart);

// 📤 Get all
router.post("/getParts", adminSubjectController.getAllParts);

module.exports = router;
