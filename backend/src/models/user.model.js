const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
  type: String,
  default: ""
},
lastName: {
  type: String,
  default: ""
},
    // password:{
    //     type:String,
    //     required:true,
    // },
    firebaseUid: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: "CUSTOMER"
    },
    mobile: {
        type: String,
    },
    address: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "addresses"
    }],
    paymentInfo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "payment_info",
    }],
    ratings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ratings",
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "reviews",
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    }

})

const User = mongoose.model("users", userSchema)
module.exports = User;