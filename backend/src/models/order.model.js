const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orderItems',
    }],
    orderDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    deliveryDate: {
        type: Date,
    },
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'addresses',
    },
    paymentDetails: {
        paymentMethod: {
            type: String,
        },
        transactionId: {
            type: String,
        },
        paymentId: {
            type: String,
        },
        paymentStatus: {
            type: String,
            default: "PENDING"
        }
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    totalDiscountedPrice: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    orderStatus: {
        type: String,
        enum: [
            "PENDING",
            "PLACED",
            "CONFIRMED",
            "PACKED",
            "SHIPPED",
            "DELIVERED",
            "CANCELLED",
            "RETURNED"
        ],
        default: "PENDING"
    },
    totalItem: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    shipment: {
        provider: {
            type: String,
            default: "SHIPROCKET"
        },
        shipmentId: String,
        orderId: String,       // Shiprocket order id
        awb: String,           // tracking number
        courier: String,
        status: String,
        estimatedDelivery: Date,
//////////////////////////////////////////////

 events: [
    {
      status: String,
      location: String,
      message: String,
      time: Date
    }
  ]


    }

});

const Order = mongoose.model('orders', orderSchema);
module.exports = Order;
