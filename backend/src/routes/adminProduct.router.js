const express = require("express")
const router = express.Router();

const productController = require("../controller/product.controller.js");
const authenticate = require("../middleware/authenticate.js");
const requireAdmin = require("../middleware/Admin.js");
router.post("/", authenticate,requireAdmin, productController.createProduct);
router.post("/creates",authenticate,requireAdmin, productController.createMultipleProducts);
router.delete("/:id",authenticate, requireAdmin, productController.deleteProduct);
router.put("/:id", authenticate, requireAdmin, productController.updateProduct);

module.exports = router;