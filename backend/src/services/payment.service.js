const razorpay = require("../config/razorpay")
const orderService = require("../services/order.service.js")

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


const updateOrderInfo = async (reqData) =>{
    const paymentId = reqData.payment_id;
    const orderId = reqData.order_id;
    try{
        const order = await orderService.findOrderById(orderId);
        const payment = await Razorpay.payments.fetch(paymentId);
        if(payment.status =="captured"){
            order.paymentDetails.paymentId = paymentId;
            order.paymentDetails.status = "COMPLETED";
            order.orderStatus="PLACED"

            await order.save()
        }

        const resData = {message:"Your order is placed ",success:true}
        return resData;

    }
    catch(error){
        throw new Error(error.message)
    }
}

module.exports={
    //createPaymentLink,
    updateOrderInfo,
    createRazorpayOrder
}