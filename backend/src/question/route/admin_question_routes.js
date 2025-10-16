const express = require("express");
const multer = require("multer");
const path = require("path");
const adminSubjectController = require("../controller/admin_question_controller");

const router = express.Router();

router.post("/getAllQuestions", adminSubjectController.getAllQuestions);

module.exports = router;
