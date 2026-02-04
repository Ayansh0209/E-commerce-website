const express = require("express")
const router = express.Router();

const orderController = require("../controller/adminOrder.controller.js");
const authenticate = require("../middleware/authenticate.js");
const requireAdmin = require("../middleware/Admin.js");

router.get("/",authenticate , requireAdmin, orderController.getAllOrders);
router.put("/:orderId/confirmed", authenticate, requireAdmin, orderController.confirmedOrders);
router.put("/:orderId/ship", authenticate, requireAdmin, orderController.shippOrders);
router.put("/:orderId/deliver", authenticate, requireAdmin, orderController.deliverOrders);
router.put("/:orderId/cancel", authenticate, orderController.cancelledOrders);

router.put("/:orderId/delete", authenticate, orderController.deleteOrders);

module.exports = router;

