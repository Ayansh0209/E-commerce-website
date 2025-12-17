const cartService = require("../services/cart.service.js");
const Address = require("../models/address.model.js");
const Order = require("../models/order.model.js");
const OrderItems = require("../models/orderitems.js");
async function createOrder(user, shippAddress) {
    let address;
    if (shippAddress._id) {
        let existAddress = await Address.findById(shippAddress._id);
        address = existAddress;
    }
    else {
        address = new Address(shippAddress);
        address.user = user;
        await address.save();

        user.address.push(address._id);

        await user.save();
    }

    const cart = await cartService.findUserCart(user._id);
    const orderItems = [];

    for (const item of cart.cartItems) {
        const orderItem = new OrderItems({
            price: item.price,
            product: item.product,
            quantity: item.quantity,
            size: item.size,
            userId: user._id,
            discountedPrice: item.discountedPrice
        })
        const createdOrderItem = await orderItem.save();
        orderItems.push(createdOrderItem);
    }
    const createdOrder = new Order({

        //user,
        user: user._id,

        orderItems,
        totalPrice: cart.totalPrice,
        // totalDiscountedPrice: cart.totalDiscountedPrice,
        totalDiscountedPrice: cart.totalPrice - cart.discounts,

        discount: cart.discounts,
        totalItem: cart.totalItem,
        shippingAddress: address._id
    })
    const savedOrder = await createdOrder.save();
    return savedOrder;

}
// this need to be checked and to be connected to shiprocket or has to see this 

async function placeOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderStatus = "PLACED";
    order.paymentDetails.status = "COMPLETED";

    return await order.save();

}
async function confirmedOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderStatus = "CONFIRMED";
    return await order.save();

}

async function shipOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderStatus = "SHIPPED";
    return await order.save();
}

async function deliverOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderStatus = "DELIVERED";
    return await order.save();
}

async function cancelOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderStatus = "CANCELLED";
    return await order.save();
}

async function findOrderById(orderId) {
    const order = await Order.findById(orderId).populate("user").populate({ path: "orderItems", populate: { path: "product" } }).populate("shippingAddress")
    return order
}

async function userOrderHistory(userId) {
    try {
        const orders = await Order.find({ user: userId, orderStatus: "PLACED" }).populate({ path: "orderItems", populate: { path: "product" } }).lean()
        return orders
    }
    catch (error) {
        throw new Error(error.message);

    }
}

async  function getAllOrders(){
     return await Order.find().populate({path: "orderItems", populate: { path: "product"}}).lean()
    
}

async function deleteOrder(orderId){
    const order = await findOrderById(orderId);
    await Order.findByIdAndDelete(order._id);
}

module.exports = { createOrder, placeOrder, confirmedOrder, shipOrder, deliverOrder, cancelOrder, findOrderById, userOrderHistory,getAllOrders,deleteOrder }