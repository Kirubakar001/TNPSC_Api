const express = require("express");
const router = express.Router();


router.post("/otp_verify", userController.sendOtp);