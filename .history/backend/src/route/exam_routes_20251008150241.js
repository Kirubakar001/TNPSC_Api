const express = require("express");
const router = express.Router();
const userController = require("../controller/e");


router.post("/otp_verify", userController.sendOtp);