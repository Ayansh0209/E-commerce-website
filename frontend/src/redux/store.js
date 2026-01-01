import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./product/productSlice";
import cartReducer from"./cart/cartSlice";
import orderReducer from"./order/orderSlice";
import addressReducer from "./address/addressSlice"
export const store = configureStore({
  reducer: {
    product: productReducer,
    cart:cartReducer,
    order: orderReducer,
    address: addressReducer,
  },
});





