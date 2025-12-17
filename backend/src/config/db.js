const mongoose = require("mongoose")
const mongodbURL = "mongodb+srv://1atreyaaryan_db_user:2znfD8vsOAa9XGNb@cluster0.ztcmifw.mongodb.net/?appName=Cluster0"

const connectDB=()=>{
    return mongoose.connect(mongodbURL);
}
module.exports={connectDB}


