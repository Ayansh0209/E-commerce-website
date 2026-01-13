const express = require("express");
const router = express.Router();
const shiprocketWebhook = require("../controller/shiprocketWeb.controller");

router.post("/", shiprocketWebhook.shiprocketWebhook);

module.exports = router;
