const mongoose = require("mongoose")
const mongodbURL = process.env.MONGODB_URI;

const connectDB=()=>{
    return mongoose.connect(mongodbURL);
}
module.exports={connectDB}


