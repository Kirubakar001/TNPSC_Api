const userController = require("../controller/user_controller");
const express = require("express");
const router = express.Router();

router.post("/otp_verify", userController.sendOtp);
router.post("/update_user", userController.updateUser);

module.exports = router;
 