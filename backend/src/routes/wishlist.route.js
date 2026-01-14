const express = require("express");
const router = express.Router();
const whishlistController = require("../controller/wishlist.controller")
const authenticate = require("../middleware/authenticate");

router.post("/", authenticate, whishlistController.toggleWishlist);
router.get("/", authenticate, whishlistController.getWishlist);
router.post("/move-to-cart", authenticate, whishlistController.moveWishlistToCart);
module.exports = router;
