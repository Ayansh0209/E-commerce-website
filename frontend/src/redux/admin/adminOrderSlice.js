import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./adminOrderApi";

// GET ALL
export const fetchOrders = createAsyncThunk(
  "adminOrders/fetchAll",
  async () => {
    return await api.getAllOrders();
  }
);

// CONFIRM
export const confirmOrder = createAsyncThunk(
  "adminOrders/confirm",
  async (orderId) => {
    return await api.confirmOrder(orderId);
  }
);

// CANCEL
export const cancelOrder = createAsyncThunk(
  "adminOrders/cancel",
  async (orderId) => {
    return await api.cancelOrder(orderId);
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // CONFIRM
      .addCase(confirmOrder.fulfilled, (state, action) => {
        const idx = state.list.findIndex(
          (o) => o._id === action.payload._id
        );
        if (idx !== -1) state.list[idx] = action.payload;
      })

      // CANCEL
      .addCase(cancelOrder.fulfilled, (state, action) => {
        const idx = state.list.findIndex(
          (o) => o._id === action.payload._id
        );
        if (idx !== -1) state.list[idx] = action.payload;
      });
  },
});

export default adminOrderSlice.reducer;
