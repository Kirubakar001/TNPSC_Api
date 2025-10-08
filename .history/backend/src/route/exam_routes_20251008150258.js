const express = require("express");
const router = express.Router();
const exam = require("../controller/exam_controller");


router.post("/otp_verify", userController.sendOtp);