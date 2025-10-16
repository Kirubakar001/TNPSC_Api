const userUnitController = require("../controller/user_title_controller");
const express = require("express");
const router = express.Router();

router.post("/titleList", userUnitController.getAllTitle );

module.exports = router;
