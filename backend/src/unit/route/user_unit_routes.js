const userUnitController = require("../controller/user_unit_controller");
const express = require("express");
const router = express.Router();

router.post("/unitList", userUnitController.getAllUnit );

module.exports = router;
