const express = require('express')
const authenticate = require("../middleware/authenticate")
const router = express.Router();
const paymentController = require("../controller/payment.controller")

// router.post("/:id",authenticate,paymentController.createPaymentLink);
// router.get("/",authenticate,paymentController.updateOrderInfo);


router.post("/create-order/:orderId",authenticate, paymentController.createPaymentLink);

// router.post(
//   "/verify",
//   authenticate,
//   paymentController.verifyPayment
// );

// router.post(
//   "/cod/:orderId",
//   authenticate,
//   paymentController.placeCodOrder
// );

module.exports = router