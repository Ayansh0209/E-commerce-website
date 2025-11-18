import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";
import userReducer from "../slices/userSlice";
import addressReducer from "../slices/addressSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    address: addressReducer,
  },
});
