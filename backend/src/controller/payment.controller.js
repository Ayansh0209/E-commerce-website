const paymentService  = require('../services/payment.service.js');

 const createPaymentLink = async(req, res)=>{
    try{
        const paymentLink = await paymentService.createRazorpayOrder(req.params.orderId);
        return res.status(200).send(paymentLink)

    }catch(error){
        //return res.status(500).send(error.message)
         console.error("Create payment error:", error);
    return res.status(500).json({
      message: error.message || "Payment creation failed"
    });
    }
 }

 const updateOrderInfo = async(req, res)=>{
    try{
        await paymentService.updateOrderInfo(req.body);
        return res.status(200).send({message:"payment information",status:true})

    }catch(error){
        return res.status(500).send(error.message)
    }
 }

 module.exports={
    createPaymentLink,updateOrderInfo
 }