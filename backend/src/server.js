require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});

const app = require('.')
const {connectDB} = require('./config/db')
const PORT = 5454

app.listen(PORT ,async ()=>{
    await connectDB();

   console.log(`Ecommerce API listening on PORT: ${PORT}`)

})