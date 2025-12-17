const express = require("express")
const router = express.Router();

const cartController = require("../controller/cart. controller.js");
const authenticate = require("../middleware/authenticate.js");
router.post("/", authenticate, cartController.findUserCart)
router.put("/add", authenticate, cartController.addItemToCart)
module.exports = router;