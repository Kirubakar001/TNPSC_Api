const userExamController = require("../controller/user_part_controller");
const express = require("express");
const router = express.Router();

router.post("/partList", userExamController.getAllParts);

module.exports = router;
