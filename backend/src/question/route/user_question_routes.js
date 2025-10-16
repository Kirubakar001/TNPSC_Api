const userUnitController = require("../controller/user_question_controller");
const express = require("express");
const router = express.Router();

router.post("/questionList", userUnitController.getAllQuestions );

module.exports = router;
