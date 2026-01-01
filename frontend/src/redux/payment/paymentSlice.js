import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createPaymentAPI } from "./paymentapi";


export const createPayment = createAsyncThunk(
  "payment/create",
  async (orderId) => {
    return await createPaymentAPI(orderId);
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    loading: false,
    error: null
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
