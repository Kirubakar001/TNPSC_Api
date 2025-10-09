const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin_controller");


router.post("/login", adminController.loginAdmin);
router.post("/add", adminController.addAdmin);
router.post("/update", adminController.updateAdmin);
router.post("/delete", adminController.deleteAdmin);


module.exports = router;