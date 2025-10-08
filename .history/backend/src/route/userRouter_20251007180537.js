const userController = require("../controller/userController");
const express = require("express");
const router = express.Router();

router.post("/otp_verify", userController.sendOtp);
router.post("/update_user", userController.updateUser);

module.exports = router;
