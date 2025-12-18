const express = require("express")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors())

app.get( "/",(req, res)=>{
    return res.status(200).send({message: " welcome to ecommerce api - node",status:true})
})
const authRouters = require("./routes/auth.route.js")
const userRouters = require("./routes/user.route.js")
const productRouters = require("./routes/product.routes.js")
const adminProductRouters = require("./routes/adminProduct.router.js")
const cartRouters = require("./routes/cart.route.js")
const cartItemRouters = require("./routes/cartItem.routes.js")
const adminOrderRouters = require("./routes/adminOrder.routes.js")
const orderRouters = require("./routes/order.routes.js")
const reviewRouters = require("./routes/review.routes.js")
const ratingRouters = require("./routes/rating.routes.js")      



//app.use("/auth",authRouters)
app.use("/api/users",userRouters)
app.use("/api/products",productRouters)
app.use("/api/admin/products",adminProductRouters)
app.use("/api/cart",cartRouters)
app.use("/api/cart_items",cartItemRouters)
app.use("/api/admin/orders",adminOrderRouters)
app.use("/api/orders",orderRouters)
app.use("/api/reviews",reviewRouters)
app.use("/api/ratings",ratingRouters)





module.exports =app;


