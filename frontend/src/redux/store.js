import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./product/productSlice";
import cartReducer from "./cart/cartSlice";
import orderReducer from "./order/orderSlice";
import addressReducer from "./address/addressSlice"
import paymentReducer from "./payment/paymentSlice"
import ratingReducer from "./rating/ratingSlice"
import reviewReducer from "./review/reviewSlice"
import adminProducts from "./admin/adminproductSlice"
import adminOrderReducer from "./admin/adminOrderSlice"
import adminDashboardReducer from "./admin/adminDashboardSlice";
import adminCustomerReducer from "./admin/adminCustomerSlice";
export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    address: addressReducer,
    payment: paymentReducer,
    rating: ratingReducer,
    review: reviewReducer,
    adminProducts: adminProducts,
    adminOrders: adminOrderReducer,
    adminDashboard: adminDashboardReducer,

    adminCustomers: adminCustomerReducer, 

  },
});





