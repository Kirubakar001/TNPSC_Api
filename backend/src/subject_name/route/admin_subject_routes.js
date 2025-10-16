const express = require("express");
const multer = require("multer");
const path = require("path");
const adminSubjectController = require("../controller/admin_subject_controller");

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "../../uploads")),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// 📥 Insert
router.post("/insertSubject", upload.single("img"), adminSubjectController.insertSubject);

// ✏️ Update
router.post("/updateSubject", upload.single("img"), adminSubjectController.updateSubject);

// 🗑️ Delete
router.post("/deleteSubject", adminSubjectController.deleteSubject);

// 📤 Get all
router.get("/getSubjects", adminSubjectController.getAllSubjects);

module.exports = router;
