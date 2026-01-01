const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const addressController = require("../controller/address.controller.js");

router.post("/", authenticate, addressController.addAddress);
router.get("/user", authenticate, addressController.getUserAddresses);
router.put("/:id", authenticate, addressController.updateAddress);
router.delete("/:id", authenticate, addressController.deleteAddress);

module.exports = router;
