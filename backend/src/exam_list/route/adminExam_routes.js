const express = require("express");
const multer = require("multer");
const path = require("path");
const adminExamController = require("../controller/adminExam_controller");

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads")); // store inside backend/src/uploads
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// 📥 POST - Insert exam details
router.post(
  "/insertExam",
  upload.single("img"),
  (req, res, next) => {
    // attach file info
    req.img = req.file;
    next();
  },
  adminExamController.insertExamDetails
);

router.post(
  "/updateExam",
  upload.single("img"),
  (req, res, next) => {
    req.img = req.file;
    next();
  },
  adminExamController.updateExamDetails
);

// 📤 GET - Fetch all exam details
router.get("/getExam", adminExamController.getAllExamDetails);
router.post("/deleteExam", adminExamController.deleteExamDetails);


module.exports = router;
