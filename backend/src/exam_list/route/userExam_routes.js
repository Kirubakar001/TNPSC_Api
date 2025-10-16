const userExamController = require("../controller/userExam_controller");
const express = require("express");
const router = express.Router();

router.post("/examName", userExamController.getAllExamDetails);

module.exports = router;
