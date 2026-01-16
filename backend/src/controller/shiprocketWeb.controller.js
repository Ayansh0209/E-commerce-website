const Order = require("../models/order.model");
const { checkPinCode } = require("../services/shiprocket.service");
async function shiprocketWebhook(req, res) {
    try {
        const payload = req.body;

        const {
            awb,
            current_status,
            shipment_id,
            courier_name,
            etd,
            location,
            scan_date_time,
            description
        } = payload;

        // find order by AWB
        const order = await Order.findOne({
            "shipment.awb": awb
        });

        if (!order) {
            return res.status(200).send("Order not found");
        }

        // update shipment
        order.shipment.shipmentId = shipment_id;
        order.shipment.courier = courier_name;
        order.shipment.status = current_status;
        order.shipment.estimatedDelivery = etd
            ? new Date(etd)
            : order.shipment.estimatedDelivery;

        order.shipment.events.push({
            status: current_status,
            location: location || "",
            message: description || "",
            time: scan_date_time ? new Date(scan_date_time) : new Date()
        });

        // 🔁 map shipment status → order status

        if (["PICKED_UP", "IN_TRANSIT"].includes(current_status)) {
            order.orderStatus = "SHIPPED";
        }

        if (current_status === "OUT_FOR_DELIVERY") {
            order.orderStatus = "OUT_FOR_DELIVERY";
        }

        if (current_status === "DELIVERED") {
            order.orderStatus = "DELIVERED";
        }


        await order.save();

        return res.status(200).send("Webhook processed");
    } catch (err) {
        console.error("Shiprocket webhook error:", err);
        return res.status(200).send("Webhook error");
    }
}



async function checkDelivery(req, res) {
  try {
    const { pincode } = req.query;

    // basic validation
    if (!pincode || !/^[0-9]{6}$/.test(pincode)) {
      return res.status(400).json({
        success: false,
        message: "Invalid pincode",
      });
    }

    const result = await checkPinCode({
      deliveryPincode: pincode,
      cod: true,
    });

    return res.status(200).json({
      success: true,
      ...result,
    });
  }catch (error) {
  console.error("FULL ERROR:", error);
  return res.status(500).json({
    success: false,
    message: error.message,
  });
}

}



module.exports = { shiprocketWebhook,checkDelivery };
