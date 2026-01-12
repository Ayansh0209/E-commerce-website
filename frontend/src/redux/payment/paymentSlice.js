import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createPaymentAPI } from "./paymentapi";
import { updateOrderInfo } from "./paymentapi";
import { fetchCart } from "../cart/cartSlice";
//import { fetchOrders } from "../order/orderSlice";

export const createPayment = createAsyncThunk(
  "payment/create",
  async (orderId) => {
    return await createPaymentAPI(orderId);
  }
);

export const finalizePayment = createAsyncThunk(
  "payment/finalize",
  async ({ paymentId, orderId }, { dispatch }) => {
    await updateOrderInfo({ paymentId, orderId });

    dispatch(fetchCart());       // Cart becomes empty
   // dispatch(fetchOrders());     // Orders page updates
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    loading: false,
    error: null,
    razorpayOrder: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPayment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default paymentSlice.reducer;
