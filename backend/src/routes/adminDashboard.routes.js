const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate"); // Firebase token verify
const requireAdmin = require("../middleware/Admin");
const dashboardController = require("../controller/adminDashboard.controller");

router.get(
  "/",
  authenticate,
  requireAdmin,
  dashboardController.getDashboardData
);

router.get(
  "/customers",
  authenticate,
  requireAdmin,
  dashboardController.getCustomers
);

module.exports = router;
