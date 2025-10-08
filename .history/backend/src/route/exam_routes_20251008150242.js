const express = require("express");
const router = express.Router();
const userController = require("../controller/exam_controller");


router.post("/otp_verify", userController.sendOtp);