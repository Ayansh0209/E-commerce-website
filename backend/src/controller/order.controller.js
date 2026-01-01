const orderService = require("../services/order.service.js");

const createOrder = async (req, res) => {

    const user = await req.user;
    const { addressId } = req.body;
    if (!addressId) {
        return res.status(400).json({ message: "addressId is required" });
    }

    try {
        let createdOrder = await orderService.createOrder(user,addressId);
        return res.status(201).send(createdOrder);
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const findOrderById = async (req, res) => {
    const user = req.user;
    try {
        let createdOrder = await orderService.findOrderById(req.params.id);
        return res.status(201).send(createdOrder);
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}


const OrderHistory = async (req, res) => {
    const user = await req.user;
    try {
        let createdOrder = await orderService.userOrderHistory(user._id);
        return res.status(201).send(createdOrder);
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

module.exports = { createOrder, OrderHistory, findOrderById }