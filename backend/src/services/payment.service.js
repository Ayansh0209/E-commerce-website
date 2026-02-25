const razorpay = require("../config/razorpay")
const orderService = require("../services/order.service.js")
const cartService = require("../services/cart.service.js")
const shiprocketService = require("../services/shiprocket.service.js")
// const createPaymentLink = async(orderId)=>{
//     try{
//     const order =  await orderService.findOrderById(orderId);
//     const paymentLinkReq = {
//         amount:order.totalDiscountedPrice*100,
//         currency:"INR",
//         customer:{
//             name:order.user.firstName + " " + order.user.lastName,
//             contact:  order.shippingAddress.mobile || order.user.mobile,
//             email : order.user.email
//         },
//         notify:{
//             sms:true,
//             email:true,
//         },
//         reminder_enable:true,
//         // to be changed when go to production
//         callback_url:`http://localhost:3000/payment/${orderId}`,
//         callback_method: 'get'
//     };

//     const paymentLink = await Razorpay.paymentLink.create(paymentLinkReq);
//     const paymentLinkId = paymentLink.id;
//     const payment_link_url = paymentLink.short_url;

//     const resData={
//         paymentLinkId,
//         payment_link_url
//     }
//     return resData;

//     }catch(error){
//         throw new Error(error.message)
//     }
// }

// const createRazorpayOrder = async (orderId) => {
//   const order = await orderService.findOrderById(orderId);

//   const razorpayOrder = await razorpay.orders.create({
//     amount: order.totalDiscountedPrice * 100, // paise
//     currency: "INR",
//     receipt: `order_rcpt_${order._id}`,
//   });

//   return {
//     razorpayOrderId: razorpayOrder.id,
//     amount: razorpayOrder.amount,
//     currency: razorpayOrder.currency,
//     orderId: order._id,
//     user: {
//       name: `${order.user.firstName} ${order.user.lastName}`,
//       email: order.user.email,
//       contact: order.shippingAddress.mobile || order.user.mobile
//     }
//   };
// };


const createRazorpayOrder = async (orderId) => {
  const order = await orderService.findOrderById(orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  if (!order.totalDiscountedPrice || order.totalDiscountedPrice <= 0) {
    throw new Error("Invalid order amount");
  }

  const razorpayOrder = await razorpay.orders.create({
    amount: order.totalDiscountedPrice * 100,
    currency: "INR",
    receipt: `order_rcpt_${order._id}`,
  });

  const user = order.user || {};
  const address = order.shippingAddress || {};

  return {
    razorpayOrderId: razorpayOrder.id,
    amount: razorpayOrder.amount,
    currency: razorpayOrder.currency,
    orderId: order._id,
    user: {
      name: `${user.firstName || ""} ${user.lastName || ""}`,
      email: user.email || "",
      contact: address.mobile || user.mobile || ""
    }
  };
};


const updateOrderInfo = async (reqData) => {
  const paymentId = reqData.payment_id;
  const orderId = reqData.order_id;

  try {
    const order = await orderService.findOrderById(orderId);
    if (!order) throw new Error("Order not found");

    const payment = await razorpay.payments.fetch(paymentId);

    if (payment.status === "captured") {
       for (const item of order.orderItems) {
        const product = item.product;

        if (!product) {
          throw new Error("Product not found for order item");
        }

        if (product.quantity < item.quantity) {
          throw new Error(`${product.title} is out of stock`);
        }

        product.quantity -= item.quantity;
        await product.save();
      }
      //  Update order
      order.paymentDetails.paymentId = paymentId;
      order.paymentDetails.paymentStatus = "COMPLETED";
      order.orderStatus = "PLACED";
      await order.save();
      await cartService.clearUserCart(order.user);
      if (!order.shipment || !order.shipment.shipmentId) {
        await shiprocketService.createShiprocketOrder(order._id);
      }
      //  CLEAR CART HERE
      //await cartService.clearUserCart(order.user._id || order.user);

      return {
        success: true,
        message: "Order placed successfully"
      };
    }

    throw new Error("Payment not captured");
  } catch (error) {
    throw new Error(error.message);
  }
};


module.exports = {
  //createPaymentLink,
  updateOrderInfo,
  createRazorpayOrder
}