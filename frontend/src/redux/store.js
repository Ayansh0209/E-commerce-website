import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./product/productSlice";
import cartReducer from"./cart/cartSlice";
import orderReducer from"./order/orderSlice";
export const store = configureStore({
  reducer: {
    product: productReducer,
    cart:cartReducer,
    order: orderReducer,

  },
});





