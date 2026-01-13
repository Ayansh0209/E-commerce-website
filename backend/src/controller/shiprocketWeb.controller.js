const Order = require("../models/order.model");

async function shiprocketWebhook(req, res) {
    try {
        const payload = req.body;

        const {
            awb,
            current_status,
            shipment_id,
            courier_name,
            etd
        } = payload;

        // find order by AWB
        const order = await Order.findOne({
            "shipment.awb": awb
        });

        if (!order) {
            return res.status(200).send("Order not found");
        }

        // update shipment
        order.shipment.status = current_status;
        order.shipment.shipmentId = shipment_id;
        order.shipment.courier = courier_name;
        order.shipment.estimatedDelivery = etd ? new Date(etd) : null;

        // 🔁 map shipment status → order status
       
        if (
            ["PICKED_UP", "IN_TRANSIT", "OUT_FOR_DELIVERY"].includes(current_status)
        ) {
            order.orderStatus = "SHIPPED";
        }

        if (current_status === "DELIVERED") {
            order.orderStatus = "DELIVERED";
        }

        if (current_status === "RTO") {
            order.orderStatus = "RETURNED";
        }


        await order.save();

        return res.status(200).send("Webhook processed");
    } catch (err) {
        console.error("Shiprocket webhook error:", err);
        return res.status(200).send("Webhook error");
    }
}

module.exports = { shiprocketWebhook };
