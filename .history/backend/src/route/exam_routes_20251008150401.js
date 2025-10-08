const express = require("express");
const router = express.Router();
const examController = require("../controller/exam_controller");


router.post("/otp_verify", examController.getAllExam);