// src/redux/order/orderSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrderAPI, getOrderByIdAPI } from "./orderApi";

// CREATE ORDER
export const createOrder = createAsyncThunk(
  "order/create",
  async (addressData) => {
    return await createOrderAPI(addressData);
  }
);

// GET ORDER BY ID
export const fetchOrderById = createAsyncThunk(
  "order/fetchById",
  async (orderId) => {
    return await getOrderByIdAPI(orderId);
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearOrder(state) {
      state.order = null;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE ORDER
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.success = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // GET ORDER BY ID
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
