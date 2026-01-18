const express = require("express");
const router = express.Router();
const whishlistController = require("../controller/wishlist.controller")
const authenticate = require("../middleware/authenticate");

router.post("/add", authenticate, whishlistController.addToWishlist);
router.delete("/remove/:productId", authenticate, whishlistController.removeFromWishlist);
router.get("/", authenticate, whishlistController.getWishlist);
router.post("/move-to-cart", authenticate, whishlistController.moveWishlistToCart);
module.exports = router;
