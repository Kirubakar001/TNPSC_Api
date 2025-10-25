const express = require("express");
const multer = require("multer");
const path = require("path");
const adminSubjectController = require("../controller/admin_question_controller");

const router = express.Router();

router.post("/list", adminSubjectController.getAllQuestions);
router.post("/insert", adminSubjectController.insertQuestion);
router.post("/update", adminSubjectController.updateQuestion);
router.post("/delete", adminSubjectController.deleteQuestion);

module.exports = router;
