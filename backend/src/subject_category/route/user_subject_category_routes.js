const userExamController = require("../controller/user_subject_category_controller");
const express = require("express");
const router = express.Router();

router.post("/subjectList", userExamController.getAllSubjectDetails);

module.exports = router;
