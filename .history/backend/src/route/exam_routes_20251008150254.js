const express = require("express");
const router = express.Router();
const examco = require("../controller/exam_controller");


router.post("/otp_verify", userController.sendOtp);